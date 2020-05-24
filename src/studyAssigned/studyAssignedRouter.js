const router = require('express').Router();
const studyAssigned = require('./studyAssignedController');

const studyRouter = () =>{
    
    router.route("/")
    .get(studyAssigned.getStudyAssigned);

    router.route("/distribuition/:projectid")
    .get(studyAssigned.getStudyAssignedDistribuition);

    router.route("/distribuition/:projectid/:researcherid")
    .get(studyAssigned.getStudyAssignedDistribuitionByResearcher);
    
    router.route("/researcherStudies/")
    .get(studyAssigned.getStudyAssignedByResearcher);   

    router.route("/selectionStatusResult/:projectid")
    .get(studyAssigned.getStatusSelectionResultsAmount);

    return router;    
}

module.exports = studyRouter;