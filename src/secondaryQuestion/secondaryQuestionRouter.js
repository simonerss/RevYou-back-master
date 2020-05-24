const router = require('express').Router();
const secondaryQuestionController = require('./secondaryQuestionController');

const secondaryQuestionRouter = () => {
    router.route('/')
    .post(secondaryQuestionController.createSecondaryQuestion)
    .put(secondaryQuestionController.updateSecondaryQuestion)
    .delete(secondaryQuestionController.deleteSecondaryQuestion);

    router.route('/:ProjectId')
    .get(secondaryQuestionController.getSecondaryQuestion);

    return router;
}


module.exports = secondaryQuestionRouter;