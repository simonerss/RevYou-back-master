const router = require('express').Router();
const extractionStepController = require('../extractionStep/extractionStepController');
const extractionStepReportController = require('../extractionStep/ExtractionStepReportController');

const extractionStepRouter = () => {

    router.route('/:projectId')
    .get(extractionStepController.getFinishedExtractionStep)
    .post(extractionStepController.createExtractionStep);

    router.route('/:projectId/current')
    .get(extractionStepController.getCurrentExtractionStep);

    router.route('/:stepId')
    .put(extractionStepController.updateExtractionStep)
    .delete(extractionStepController.deleteExtractionStep);
    
    router.route('/report/:stepId')
    .get(extractionStepController.getExtractionStep);

    router.route('/list/:projectid')
    .get(extractionStepReportController.getExtractionStepsList);

    return router;
}


module.exports = extractionStepRouter;