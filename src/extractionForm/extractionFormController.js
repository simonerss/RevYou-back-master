const {
  Field,
  Form,
  Answer,
  Study,
  TemplateForm,
  ExtractionStep,
  SelectionResult,
  Researcher
} = require("../../sequelize/models/index");
var constants = require("../../lib/constants");
const Sequelize = require("sequelize");

const getAnswer = async (req, res) => {
  try {
    const { formId, fieldId } = req.params;
    const answer = await Answer.find({
      where: { formId: formId, fieldId: fieldId }
    });
    if (answer) {
      return res.status(202).send(answer);
    } else {
      return res.status(404).send("No answer found for the this field.");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to find the answer requested.");
  }
};

const updateCreate = async (req, res) => {
  try {
    const { formId, fieldId } = req.params;
    const {
      content,
      supportData,
      option,
      status = constants.answerStatus.FILLED
    } = req.body;
    const form = await Form.findByPk(formId);
    const field = await Field.findByPk(fieldId);
    if (field && form) {
      Answer.findOrCreate({
        where: { FormId: formId, FieldId: fieldId },
        defaults: {
          content: content,
          supportData: supportData,
          option: option,
          status: status
        }
      }).spread((answer, created) => {
        answer.get({
          plain: true
        });
        if (created === true) {
          form
            .addAnswer(answer)
            .then(field.addAnswer(answer))
            .then(form.addAnswer(answer))
            .then(updateFormStatus(formId))
            .then(res.status(201).send("A new answer was submitted "));
        } else {
          Answer.update(
            {
              content,
              supportData,
              option,
              status: status || constants.answerStatus.FILLED
            },
            { where: { FormId: formId, FieldId: fieldId } }
          )
            .then(updateFormStatus(formId))
            .then(res.status(201).send("The answer was update successfully "));
        }
      });
    } else {
      return res
        .status(500)
        .send("Sorry, we are unable to find the field and the form requested.");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to find the answer requested.");
  }
};

const getFieldsWithAnswers = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findByPk(formId);
    const fields = await Field.findAll({
      where: { TemplateFormId: form.TemplateFormId },
      order: [["position", "ASC"], ["id", "ASC"]],
      include: [{ model: Answer, required: false, where: { FormId: formId } }]
    });
    res.status(202).send(fields);
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to find the fields for the form requested.");
  }
};

const getStudyFieldsWithAnswers = async (req, res) => {
  try {
    const { formId } = req.params;
    // const template = TemplateForm.findOne({where: {TemplateFormId: stepId}});
    const form = await Form.findByPk(formId);
    const fields = await Field.findAll({
      where: { TemplateFormId: form.TemplateFormId },
      order: [["position", "ASC"], ["id", "ASC"]],
      include: [
        {
          model: Answer,
          required: true,
          // where: {
          //   status: constants.answerStatus.IN_CONFLIC
          // },
          include: { 
            attributes:['type'],
            model: Form, 
            required: true, 
            where: {StudyId: form.StudyId}
          }
        }
      ]
    });
    res.status(202).send(fields);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Sorry, we are unable to find the fields for the form requested.");
  }
};

const getForms = async (req, res) => {
  try {
    const { step, type } = req.body;
    const template = await TemplateForm.findOne({
      where: { ExtractionStepId: step.id }
    });
    if (template) {
      const studiesForm = await Study.findAll({
        where: { ProjectId: step.ProjectId },
        attributes: ["id", "title"],
        include: [
          // {
          //   model: SelectionResult,
          //   attributes: [],
          //   where: { status: constants.selectionResultStatus.ACCEPTED }
          // },
          {
            model: Form,
            attributes: ["id", "type", "status", "ResearcherId"],
            where: { TemplateFormId: template.id, type }
            // include : {
            //   model: Researcher,
            //   attributes: ['id', 'name'],
            // }
          }
        ]
      });

      if (studiesForm.length > 0) {
        res.send(studiesForm);
      } else {
        res
          .status(401)
          .send("Sorry, we are unable to find studies for the step requested.");
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to find the forms for the step requested.");
  }
};

const updateFormStatus = async formId => {
  try {
    const form = await Form.findByPk(formId);
    const countAnswers = await form.countAnswers();
    const fields = await Field.findAll({
      where: { TemplateFormId: form.TemplateFormId }
    });
    const status =
      fields.length === countAnswers
        ? constants.formStatus.FILLED
        : constants.formStatus.ON_GOING;
    form
      .update({ status })
      .then(form => console.log(`FORM ${form.id} STATUS ${form.status}`));
  } catch (error) {
    console.log(error);
  }
};

/** REFACTOR TO GET EXTRACTION FORM TYPE AS PARAM AS USE WITH DECISORS... */
const getExtractionReport = async (req, res) => {
  try {
    const { stepId, type } = req.params;
    // type: constants.formTypes.EXTRACTION

    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    const data = [];

    Form.aggregate("ResearcherId", "DISTINCT", {
      plain: false,
      where: {
        TemplateFormId: template.id,
        type
      },
      include: [
        {
          required: true,
          model: Researcher,
          attributes: ["name"]
        }
      ]
    })
      .then(async researchers => {
        for (let i = 0; i < researchers.length; i++) {
          const researcher = researchers[i];
          const { count, rows } = await Form.findAndCountAll({
            where: {
              ResearcherId: researcher["Researcher.id"],
              TemplateFormId: template.id,
              type
            },
            attributes: [
              "status",
              [Sequelize.fn("count", Sequelize.col("status")), "count"]
            ],
            group: "status"
          });

          let report = {};
          report = count.reduce((a, b) => ({
            count: Number(a.count) + Number(b.count)
          }));
          report.name = researcher["Researcher.name"];
          report.id = researcher["Researcher.id"];
          report.status = rows;
          data.push(report);
        }
      })
      .then(() => res.status(201).send(data));
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send("Sorry, we couldn't find any extraction data for the report.");
  }
};


module.exports = {
  updateCreate,
  getFieldsWithAnswers,
  getForms,
  updateFormStatus,
  getExtractionReport,
  getStudyFieldsWithAnswers,
};
