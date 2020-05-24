const router = require('express').Router();
const standardQueryController = require('./standardQueryController');

const standardQueryRouter = () => {
    router.route('/')
    .post(standardQueryController.createStandardQuery);

    router.route('/:ProjectId')
    .get(standardQueryController.getStandardQuery);

    router.route('/updateStandardQuery/:id')
    .put(standardQueryController.updateStandardQuery);

    return router;
}


module.exports = standardQueryRouter;