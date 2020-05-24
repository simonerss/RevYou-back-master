const {
  SelectionStep,
  Researcher,
  StudyAssigned
} = require("../../sequelize/models/index");
const Sequelize = require("sequelize");
const constants = require("../../lib/constants");
const uuid = require("uuid/v4");

const createSelectionStep = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      dateChecker,
      dateConflicts,
      decisors,
      checkers,
      method,
      ratedContent,
      numCheckerStudy,
      scoreBoard
    } = req.body;

    const { projectId } = req.params;
    SelectionStep.create({
      id: uuid(),
      startDate,
      endDate,
      dateChecker,
      dateConflicts,
      method,
      ratedContent: constants.ratedContent.TITLE,
      numCheckerStudy,
      scoreBoard,
      status: constants.stepStatus.SETTING,
      ProjectId: projectId
    }).then(async step => {
      if (step.id) {
        StudyAssigned.create({
          id: uuid(),
          SelectionStepId: step.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }).then(() => {
          checkers.forEach(async ex => {
            const researcher = await Researcher.findByPk(ex);
            step.addCheker(researcher);
          });
          decisors.forEach(async dc => {
            const researcher = await Researcher.findByPk(dc);
            step.addDecisor(researcher);
          });
          res.status(201).send("A new Selection Step was created.");
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
        "Sorry, we are unable to create a new Selection Step as requested."
      );
  }
};



module.exports = {
  createSelectionStep
};
