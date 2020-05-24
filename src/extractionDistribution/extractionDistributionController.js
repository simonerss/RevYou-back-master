const { Form, ExtractionStep, Study, Answer, SelectionResult, Researcher, TemplateForm } = require("../../sequelize/models/index");
const uuid = require("uuid/v4");
const constants = require("../../lib/constants");

const getStudiesDistribution = async (req, res) => {
  try {
    const { stepId } = req.params;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    const studies = await Study.findAll({
      where: { ProjectId: step.ProjectId },
      attributes: ["id", "title"],
      include: [
        {
          model: SelectionResult,
          attributes: [],
          where: { status: constants.selectionResultStatus.ACCEPTED }
        },{
          model: Form,
          required: false,
          attributes: ["ResearcherId"],
          where: {
            TemplateFormId: template.id,
            type: constants.formTypes.EXTRACTION
          }
        }
      ]
    });
    if (studies.length > 0) {
      let distribution = {};
      for (let index = 0; index < studies.length; index++) {
        const dist = studies[index];
        distribution[dist.id] = dist.Forms.map(item => item.ResearcherId);
      }
      res.send({ studies, distribution });
    } else {
      return res
        .status(404)
        .send("Unable to find studies for the project requested.");
    }
  } catch (err) {
    return res
      .status(500)
      .send(
        "Sorry, we are unable to find the studies requested for this project."
      );
  }
};

const createUpdateForm = async (req, res) => {
  try {
    const { stepId } = req.params;
    const { type, distribution } = req.body;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    let updateMessage =
      "Extraction distribution forms were updated as requested!";
    let bulkForm = [];
    if (template) {
      for (studyId in distribution) {
        let currentStudyDist = await Form.findAll({
          attributes: ["id", "ResearcherId", "status"],
          where: {
            TemplateFormId: template.id,
            StudyId: studyId,
            type: type
          }
        });
        /** If there is no distribution, all forms for this study are created */
        if (currentStudyDist.length === 0) {
          for (let researcherId of distribution[studyId]) {
            // Form.bulkCreate is the right solution, but it's giving validation error because unique values
            const promise = Form.create({
              id: uuid(),
              ResearcherId: researcherId,
              StudyId: studyId,
              TemplateFormId: template.id,
              type: type,
              status: constants.formStatus.ASSIGNED,
              createdAt: new Date(),
              updatedAt: new Date()
            });
            bulkForm.push(promise);
          }
        } else {
          /** Once already exists an distribution/forms for a certain study, we have to check who is
           * the new researcher and which form will have its reseacher switched for the new form,
           * no form can be deleted.
           */
          let newResearcher = distribution[studyId].filter(researcherId => {
            const oldDistSize = currentStudyDist.length;
            currentStudyDist = currentStudyDist.filter(
              dist => dist.ResearcherId !== researcherId
            );
            /** If the size o current distribution stays the same, it indicates the researcher we are trying
             * to add is not in there, so it will be in a list to check if we can switch the current owner of
             * that form.
             */
            return oldDistSize === currentStudyDist.length;
          });
          /** We will check if its possible to switch owner of a form, the only constrain is
           * the form status being FILLED, so we change the response message to warn the user about it
           */
          currentStudyDist.forEach(async (distribution, index) => {
            if (distribution.status !== constants.formStatus.FILLED) {
              await distribution.update({ ResearcherId: newResearcher[index] });
            } else {
              updateMessage =
                "Some forms are already FILLED and were unable do be updated as requested.";
            }
          });
        }
      }
      if (bulkForm.length > 0) {
        Promise.all(bulkForm).then(
          res
            .status(202)
            .send("All distribution forms were created as requested.")
        );
      } else {
        res.status(201).send(updateMessage);
      }
    } else {
      return res
        .status(404)
        .send("Unable to create a extraction form for the Step requested.");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Sorry, we are unable to create a new Distribtion as requested.");
  }
};
/** FUTURE REFACTOR to merge with getStudiesDistribution method, only diference is the INCLUDE */
const getStudiesDistributionConflicts = async (req, res) => {
  try {
    const { stepId } = req.params;
    const step = await ExtractionStep.findByPk(stepId);
    const template = await step.getTemplateForm();
    const studies = await Study.findAll({
      where: { ProjectId: step.ProjectId },
      attributes: ["id", "title"],
      include: [
        // UNICA MUDANCA esta nos includes
        {
          model: Form,
          required: true,
          attributes: ["ResearcherId", "type"],
          where: {
            TemplateFormId: template.id
          },
          include: [
            {
              model: Answer,
              attributes: [],
              // where: { status: constants.answerStatus.IN_CONFLIC }
            }
          ]
        }
      ]
    });
    if (studies.length > 0) {
      let avoid = {};
      let distribution = {};
      for (let index = 0; index < studies.length; index++) {
        const dist = studies[index];
        avoid[dist.id] = dist.Forms.map(item => {
          if (item.type === constants.formTypes.EXTRACTION)
            return item.ResearcherId;
        });
        distribution[dist.id] = dist.Forms.map(item => {
          if (item.type === constants.formTypes.FINAL) {
            return item.ResearcherId;
          }
        });
      }
      res.send({ studies, avoid, distribution });
    } else {
      return res
        .status(404)
        .send("Unable to find studies for the project requested.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        "Sorry, we are unable to find the studies requested for this project."
      );
  }
};

const getSelectionDistribution = async (req, res) => {
  try {
    const { stepId } = req.params;
    const step = await ExtractionStep.findOne({
      where: { id: stepId },
      include: { model: Researcher, as: "Extractor" }
    });
    const studies = await Study.findAll({
      where: { ProjectId: step.ProjectId },
      attributes: ["id"],
      include: [
        {
          model: SelectionResult,
          attributes: ['ResearcherId'],
          where: { status: constants.selectionResultStatus.ACCEPTED }
        }
      ]
    });
    if (studies.length > 0 && Object.keys(step).length > 0) {
      const extractors = step.Extractor.map(res => res.id);
      let distribution = {};
      let contExtractorStudies = {};
      // initialize all extractors count for the distribution balance
      extractors.forEach(extractor => {
        contExtractorStudies[extractor] = 0;
      });
      for (let index = 0; index < studies.length; index++) {
        const dist = studies[index];
        /*It will filter the current selection result based on the results, check if that researcher who did
        the selection is a extractor */
        distribution[dist.id] = dist.SelectionResults.filter(item => {
          if (extractors.includes(item.ResearcherId)) {
            contExtractorStudies[item.ResearcherId]++;
            return item.ResearcherId;
          }
        })
          .map(res => res.ResearcherId)
          /*in a extraordinary rare, aka naturally impossible, in case happens to existis more researchers
          / doing the selection of X study, and they are all step extractors but the numExtractorStudy 
          / from the step happens to be lower than the "selectionNumber", this will remove/ignore the 
          / extra part, althought the contExtractorsStudies will not be so reliable.*/
          .slice(0, step.numExtractorStudy);
      }

      for (let index = 0; index < studies.length; index++) {
        const dist = studies[index];
        //sort researcher object by the number of articles it already has distributed
        let researchersSorted = Object.keys(contExtractorStudies)
          .sort((a, b) => contExtractorStudies[a] - contExtractorStudies[b]);
        // variable responsible for iterate the next researcher who will recieve a study in
        // in the distribtion, this will make the distribution more balanced among the extractors
        let innerIndex = 0;
        while (distribution[dist.id].length !== step.numExtractorStudy) {
          /* It will check if the researcher isn't already at the distribution
          / then it will increment it's researcher study distribution count 
           and then put it at the distribution array of that study*/
          if (!distribution[dist.id].includes(researchersSorted[innerIndex])) {
            contExtractorStudies[researchersSorted[innerIndex]]++;
            distribution[dist.id].push(researchersSorted[innerIndex]);
          }
          innerIndex++;
        }
      }
      res.send({ distribution });
    } else {
      return res
        .status(404)
        .send("Unable to find studies for the project requested.");
    }
  } catch (err) {
    return res
      .status(500)
      .send(
        "Sorry, we are unable to find the selection requested for this project."
      );
  }
};

module.exports = {
  createUpdateForm,
  getStudiesDistribution,
  getSelectionDistribution,
  getStudiesDistributionConflicts
};
