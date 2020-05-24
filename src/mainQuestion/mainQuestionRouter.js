const router = require('express').Router();
const mainQuestionController = require('./mainQuestionController');

const mainQuestionRouter = () => {
    router.route('/')
    .post(mainQuestionController.createMainQuestion);

    router.route('/:ProjectId')
    .get(mainQuestionController.getMainQuestion);

    router.route('/updateMainQuestion/:id')
    .put(mainQuestionController.updateMainQuestion);

    return router;
}


module.exports = mainQuestionRouter;