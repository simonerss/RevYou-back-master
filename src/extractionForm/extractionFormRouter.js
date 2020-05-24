const router = require('express').Router();
const extractionFormController = require('./extractionFormController');

const extractionFormRouter = () => {
    router.route('/')
    .post(extractionFormController.getForms)

    router.route('/:stepId/report/:type')
    .get(extractionFormController.getExtractionReport);

    router.route('/:formId')
    .get(extractionFormController.getFieldsWithAnswers);

    router.route('/:formId/study')
    .get(extractionFormController.getStudyFieldsWithAnswers);
    
    router.route('/:formId/field/:fieldId')
    .post(extractionFormController.updateCreate);

    return router;
}

module.exports = extractionFormRouter;