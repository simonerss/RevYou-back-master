const router = require('express').Router();
const multer = require('multer');
const studyController = require('./studyController');
const studyReportController = require('./studyReportController');
const upload = multer({ dest: 'temp/'});

const studyRouter = () =>{
    
    router.route('/')
    .get(studyController.getSimilarity)
    .put(studyController.updateDuplicateStudy)
    .post(upload.any(), studyController.importStudies);

    router.route('/specificStudy/:id')
    .get(studyController.getStudy)
    .put(studyController.updateStudy);
    
    router.route('/duplicates/:ProjectId')
    .get(studyController.getDuplicateStudy);
    
    router.route('/findStudies')
    .get(studyController.findStudies);

    router.route('/filter')
    .get(studyReportController.filters);

    router.route('/ManualSearchGaphic')
    .get(studyReportController.identifiedByManualSearch);

    router.route('/dataStudyExtraction')
    .get(studyReportController.dataStudyExtraction);

    router.route('/dataStudyExtraction_old')
    .get(studyReportController.dataStudyExtractionOLD);
    
    router.route('/studiesInConflict/:projectid')
    .get(studyReportController.getStudiesInConflict);
    
    router.route('/studiesInExtractionConflict/:projectid')
    .get(studyReportController.getStudiesInExtractionConflict);
    
    router.route('/:ProjectId')
    .get(studyController.getStudies)
    .post(studyController.createStudy);
    
    router.route('/identified/:projectid')
    .get(studyReportController.getAllStudies);
    
    router.route('/identified/details/:studyid')
    .get(studyReportController.getStudyData);
    
    router.route('/identified/manualsearch/:projectid')
    .get(studyReportController.getStudiesIdentifiedByManualSearch);
    
    return router;
}

module.exports = studyRouter;