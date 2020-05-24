const router = require("express").Router();
const selectionStepController = require("../selectionStep/selectionStepController");
const selectionStepReportController = require("../selectionStep/selectionStepReportController");

const selectionStepRouter = () => {

  router.route("/:projectId")
    .post(selectionStepController.createSelectionStep);
    
    router.route('/studySelectionData/:studyid')
    .get(selectionStepReportController.getSelectionStepReport);
    
    router.route('/studySpecificSelectionStep/:selstepid/:researcherid')
    .get(selectionStepReportController.getSpecificSelectionStepReport);
    
    router.route('/result/:studyid/:selstepid')
    .get(selectionStepReportController.getSelectionResultReport);


  return router;
};

module.exports = selectionStepRouter;
