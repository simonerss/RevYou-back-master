const { ExtractionStep, TemplateForm, Researcher, Form, Answer, Field } = require("../../sequelize/models/index");
const Sequelize = require("sequelize");
const constants = require("../../lib/constants");
const uuid = require("uuid/v4");

const createExtractionStep = async (req, res) => {
  try {
    const { startDate, endDate, dateExtractor, dateConflicts, decisors, 
      extractors, method, numExtractorStudy, scoreBoard } = req.body;

    const { projectId } = req.params;
    ExtractionStep.create({
      id: uuid(),
      startDate,
      endDate,
      dateExtractor,
      dateConflicts,
      method,
      numExtractorStudy,
      scoreBoard,
      status: constants.stepStatus.SETTING,
      ProjectId: projectId
    }).then(async step => {
      if (step.id) {
        TemplateForm.create({
          id: uuid(),
          ExtractionStepId: step.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }).then(() => {
          extractors.forEach(async ex => {
            const researcher = await Researcher.findByPk(ex);
            step.addExtractor(researcher);
          });
          decisors.forEach(async dc => {
            const researcher = await Researcher.findByPk(dc);
            step.addDecisor(researcher);
          });
          res.status(201).send("A new Extraction Step was created.");
        });
      }
    });
  } catch (err) {
    console.dir(err);
    console.log(`CREATE ${err}`);
    console.log(`CREATE ${JSON.stringify(err)}`);
    return res
      .status(500)
      .send(
        "Sorry, we are unable to create a new Extraction Step as requested."
      );
  }
};

const getExtractionStep = async (req, res) => {
  try {
    const { stepId } = req.params;
    let extractionStep = await ExtractionStep.findOne({
      where: { id: stepId },
      include: [
        { model: Researcher, association: "Extractor" },
        { model: Researcher, association: "Decisor" }
      ]
    });

    if (extractionStep) {
      return res.status(202).send(extractionStep);
    } else {
      return res.status(404).send({extractionStep, message: "Extraction Step wasn't found."});
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to get the Extraction Step as requested.");
  }
};

const updateExtractionStep = async (req, res) => {
  try {
    const { stepId } = req.params;
    const { startDate, endDate, dateExtractor, dateConflicts, decisors, extractors,
      method, status, numExtractorStudy, scoreBoard } = req.body;

    const extractionStep = await ExtractionStep.findByPk(stepId);

    if (extractionStep) {
      await ExtractionStep.update(
        {
          startDate: startDate,
          endDate: endDate,
          dateExtractor: dateExtractor,
          dateConflicts: dateConflicts,
          method: method,
          status: status,
          numExtractorStudy: numExtractorStudy,
          scoreBoard: scoreBoard
        },
        { where: { id: stepId } }
      );

      if (status === constants.stepStatus.SETTING_DECISORS) {
        console.log(` %%%%%%%   STATUS    IFFFFFFFFF`);
        await finishFormExtraction(extractionStep);
      }

      /** Here it will remove all Extractors and Add the list of Extractors recieved */
      if (extractors) {
        console.log(
          `%%%%%%%%% UPDATE extractors::: ${JSON.stringify(extractors)}`
        );

        const currentExtractors = await extractionStep.getExtractor();
        extractionStep.removeExtractor(currentExtractors).then(() => {
          extractors.forEach(async ex => {
            const researcher = await Researcher.findByPk(ex);
            await extractionStep.addExtractor(researcher);
          });
        });
      }

      /** Here it will remove all Decisors and Add the list of Decisors recieved */
      if (decisors) {
        console.log(`%%%%%%%%% UPDATE DECISORS::: ${JSON.stringify(decisors)}`);
        const currentDecisors = await extractionStep.getDecisor();
        extractionStep.removeDecisor(currentDecisors).then(() => {
          decisors.forEach(async ex => {
            const researcher = await Researcher.findByPk(ex);
            await extractionStep.addDecisor(researcher);
          });
        });
      }
      return res.send("The Extraction Step was update successfully.");
    } else {
      return res.status(404).send("Extraction Step wasn't found.");
    }
  } catch (err) {
    console.log(`UPDATE ${err}`);
    return res
      .status(500)
      .send("Sorry, we are unable to update the Extraction Step as requested.");
  }
};

const deleteExtractionStep = async (req, res) => {
  try {
    const { stepId } = req.params;
    const extractionStep = await ExtractionStep.findByPk(stepId);

    if (extractionStep) {
      ExtractionStep.destroy({ where: { id: stepId } });
      return res.send("The Extraction Step was deleted successfully.");
    } else {
      return res.status(404).send("Extraction Step wasn't found.");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to delete the Extraction Step as requested.");
  }
};

const getCurrentExtractionStep = async (req, res) => {
  const Op = Sequelize.Op;
  let step = {};
  try {
    const { projectId } = req.params;
    step = await ExtractionStep.findOne({
      where: {
        [Op.and]: [
          {
            ProjectId: projectId
          },
          {
            status: { [Op.ne]: constants.stepStatus.FINISHED }
          }
        ]
      },
      include: [
        { model: Researcher, association: "Extractor" },
        { model: Researcher, association: "Decisor" }
      ]
    });

    res.status(200).send(step);
  } catch (err) {
    return res.send(step);
  }
};

const finishFormExtraction = async step => {
  console.log(
    `FINISH METHODDDD  >>>>>>>>>>>> ******************* ${JSON.stringify(step)}`
  );
  const template = await step.getTemplateForm();
  try {
    if (step.method === constants.stepMethods.EMI) {
      Form.update(
        { type: constants.formTypes.FINAL },
        { where: { TemplateFormId: template.id } }
      );
    } else if (step.method === constants.stepMethods.EMCCA) {
      const answers = await Answer.findAll({
        include: [
          {
            model: Field,
            required: true,
            attributes: ["type"],
            where: {
              type: constants.fieldTypes.OPEN,
              TemplateFormId: template.id
            }
          }
        ]
      }).then(answers => {
        answers.forEach(
          async answer =>
            await answer.update({ status: constants.answerStatus.IN_CONFLIC })
        );
      });
      // await answers.update({ status: constants.answerStatus.IN_CONFLIC });

      console.log(
        "`%%%%%%%%% UPDATE ANSWERS TO In CONFLICTS" + JSON.stringify(answers)
      );
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

const getFinishedExtractionStep = async (req, res) => {
  const Op = Sequelize.Op;
  try {
    const { projectId } = req.params;
    step = await ExtractionStep.findAll({
      where: {
        [Op.and]: [
          {
            ProjectId: projectId
          },
          {
            status: { [Op.eq]: constants.stepStatus.FINISHED }
          }
        ]
      },
      include: [
        { model: Researcher, association: "Extractor" },
        { model: Researcher, association: "Decisor" }
      ]
    });

    res.send(step);
  } catch (err) {
    return res.send([]);
  }
};

module.exports = {
  getExtractionStep,
  createExtractionStep,
  getFinishedExtractionStep,
  getCurrentExtractionStep,
  updateExtractionStep,
  deleteExtractionStep,
  finishFormExtraction
};
