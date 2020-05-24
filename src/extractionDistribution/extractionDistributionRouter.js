const router = require('express').Router();
const extractionDistributionController = require('./extractionDistributionController');

const extractionDistributionRouter = () => {
    router.route('/:stepId')
    .get(extractionDistributionController.getStudiesDistribution)
    .post(extractionDistributionController.createUpdateForm);

    router.route('/:stepId/selection')
    .get(extractionDistributionController.getSelectionDistribution);
    
    router.route('/:stepId/conflict')
    .get(extractionDistributionController.getStudiesDistributionConflicts);

    return router;   
}

module.exports = extractionDistributionRouter;