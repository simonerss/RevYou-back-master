const router = require('express').Router();
const templateFormController = require('./templateFormController');

const templateFormRouter = () => {
    router.route('/:stepId')
    .get(templateFormController.getFields)
    .post(templateFormController.updateCreate);

    router.route('/:stepId/field/:fieldId')
    .delete(templateFormController.deleteField);

    router.route('/:stepId/field/:fieldId/position/:position')
    .post(templateFormController.updatePosition);

    return router;
}

module.exports = templateFormRouter;