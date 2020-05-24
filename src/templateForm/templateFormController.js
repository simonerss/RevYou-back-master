const { Field, ExtractionStep, Form } = require("../../sequelize/models/index");
const Sequelize = require("sequelize");
const constants = require("../../lib/constants");
const Op = Sequelize.Op;
const uuid = require("uuid/v4");
//Use UUID hah to generate Fields ID?
//https://stackoverflow.com/questions/40734263/how-to-set-primary-key-type-to-uuid-via-sequelize-cli
// const createField = async (req, res) => {
//   try {
//     const { stepId } = req.params;
//     const { description, type, option } = req.body;
//     const step = await ExtractionStep.findByPk(stepId);
//     const template = await step.getTemplateForm();
//     console.log(
//       `step ${JSON.stringify(step)} template ${JSON.stringify(template)}`
//     );

//     if (template.id) {
//       Field.create({ description, type, option }).then(function(field) {
//         console.log(`field ${JSON.stringify(field)}`);
//         template
//           .addField(field)
//           .then(res.status(201).send("A new Field was created."));
//       });
//     } else {
//       return res
//         .status(404)
//         .send("Unable to create a field for the Step requested.");
//     }
//   } catch (err) {
//     return res
//       .status(500)
//       .send("Sorry, we are unable to create a new Field as requested.");
//   }
// };

const getFields = async (req, res) => {
  try {
    const { stepId } = req.params;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();

    if (template.id) {
      const fields = await template.getFields({
        order: [["position", "ASC"], ["id", "ASC"]]
      });

      if (fields.length) {
        return res.status(202).send(fields);
      } else {
        return res.status(302).send("No field found for the requested Step.");
      }
    } else {
      return res.status(402).send("The Step request wasn't found.");
    }
  } catch (err) {
    return res
      .status(500)
      .send({msg:"Sorry, we are unable to find the fields as requested."});
  }
};

const updatePosition = async (req, res) => {
  try {
    const { stepId, fieldId, position } = req.params;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    if (template.id) {
      const field = await Field.findByPk(fieldId);
      const oldPosition = field.position;
      await field.update({ position: 1000 });
      console.log(`#${field.position} => ${field.description}`);

      if (position < oldPosition) {
        //from the bottom of the list upwards
        await Field.update(
          { position: Sequelize.literal("position + 1") },
          {
            where: {
              position: {
                [Op.and]: {
                  [Op.lte]: oldPosition,
                  [Op.gte]: parseInt(position, 10)
                }
              }
            },
            order: [["position", "ASC"], ["id", "ASC"]]
          }
        ).then(
          await field.update({ position: position }),
          res.status(201).send("The Fields position were updated successfully.")
        );
      } else {
        //from the top of the list downwards
        await Field.update(
          { position: Sequelize.literal("position - 1") },
          {
            where: {
              position: {
                [Op.and]: {
                  [Op.lte]: parseInt(position, 10),
                  [Op.gte]: oldPosition
                }
              }
            },
            order: [["position", "ASC"], ["id", "ASC"]]
          }
        ).then(
          await field.update({ position: position }),
          res.status(201).send("The Fields position were updated successfully.")
        );
      }
    } else {
      return res.status(404).send("The Template Form wasn't found.");
    }
  } catch (err) {
    console.dir(err);
    return res.status(500).send(err);
    // .send("Sorry, we are unable to update the field as requested.");
  }
};

const deleteField = async (req, res) => {
  try {
    const { stepId, fieldId } = req.params;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    if (template.id) {
      const field = await Field.findByPk(fieldId);
      if (field) {
        template.removeField(field);
        Field.destroy({ where: { id: fieldId } }).then(
          res.send("The Field was deleted successfully.")
        );
      } else {
        return res.status(404).send("The Field wasn't found.");
      }
    } else {
      return res.status(404).send("The Template Form wasn't found.");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to delete the field as requested.");
  }
};

const updateCreate = async (req, res) => {
  try {
    const { stepId } = req.params;
    const { description, type, option, id } = req.body;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    console.log(`STEP ${stepId} BODY ${JSON.stringify(req.body)}`);

    if (!step) {
      res.status(404).send("Unable to create a field for the Step requested.");
    }

    if (id) {
      Field.update({ description, type, option }, { where: { id: id } }).then(
        res.send("The Field was updated successfully.")
      );
    } else {
      Field.create({ id: uuid(), description, type, option })
        .then(field => {
          console.log(`**** FIELD ***** ${JSON.stringify(field)}`);
          field.update({ position: 10 });
          template.addField(field);
        })
        .then(() => {
          /** Once a new field is created all forms whith status filled should move back to on_going */
          Form.update(
            { status: constants.formStatus.ON_GOING },
            {
              where: {
                TemplateFormId: template.id,
                status: constants.formStatus.FILLED
              }
            }
          );
        })
        .then(res.status(201).send("A new Field was created."));
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    res
      .status(500)
      .send("Sorry, we are unable to create or update the field requested.");
  }
};

const getDataExtraction = async (req, res) => {
    try {
        const formId = req.params.formid;
        let dataExtraction = await Form.findOne({
            where: { id: formId },
            include: [
                {
                    model: Researcher,
                    association: "Researcher",
                    attributes: ['name', 'email'],
                },
                {
                    model: Study,
                    association: "StudyOwner"
                },
                {
                    model: TemplateForm,
                    association: "TemplateForm",
                    include: [
                        {
                            model: Field,
                            association: "Field",
                            include: [{
                                model: Answer,
                                association: "Answer",
                            }]
                        }
                    ]
                },
            ]
        });

        if (dataExtraction) {
            return res.status(202).send(dataExtraction);
        } else {
            return res.status(404).send({ dataExtraction, message: "Extraction Step wasn't found." });
        }
    } catch (err) {
        return res.status(500).send("Sorry, we are unable to get the Extraction Step as requested.");
    }
    // return res.status(202).send(formId);
};

module.exports = {
  // createField,
  getFields,
  updatePosition,
  deleteField,
  updateCreate
};
