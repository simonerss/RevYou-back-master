const router = require('express').Router();
const dataGraphicController = require('./dataGraphicController');

const dataGraphicRouter = () => {
    
    router.route('/')
    .get((req, res) => { return res.json({ message: 'Data for Graphic Generation.' }); });

    router.route('/identifiedByManualsearch/:projectid')
    .get(dataGraphicController.manualSearchAmount);

    router.route('/identifiedByAutomaticSearch/:projectid')
    .get(dataGraphicController.automaticSearchAmount);

    router.route('/StudyBySearchEngine/:projectid')
    .get(dataGraphicController.StudyBySearchEngineAmount);

    router.route('/StudyBySearchEnginee/:projectid')
    .get(dataGraphicController.StudyBySearchEngineAmountt);

    router.route('/byAutomaticSearchMethod/:projectid')
    .get(dataGraphicController.automaticSearchMethodAmount);

    router.route('/byAdaptedQuery/:projectid')
    .get(dataGraphicController.StudyByadaptedQueryAmount);
    
    router.route('/rejectedByCriteria/:projectid')
    .get(dataGraphicController.rejectedByCriteriaAmount);
    
    router.route('/acceptedByYear/:projectid')
    .get(dataGraphicController.acceptedByYearAmount);

    router.route('/studiesPublishYear/:projectid')
    .get(dataGraphicController.studiesPublishYear);
    
    router.route('/studiesSearchEngine/:projectid')
    .get(dataGraphicController.studiesSearchEngine);
    
    router.route('/acceptedBySearchEngine/:projectid')
    .get(dataGraphicController.acceptedBySearchEngineAmount);

    return router;
}

module.exports = dataGraphicRouter;