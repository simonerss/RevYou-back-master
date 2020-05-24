const router = require('express').Router();
const selectionCriteriaController = require('./selectionCriteriaController');

const selectionCriteriaRouter = () => {
    router.route('/')
    .post(selectionCriteriaController.createSelectionCriteria);

    router.route('/:ProjectId')
    .get(selectionCriteriaController.getSelectionCriteria);

    router.route('/deleteCriteria/:id')
    .delete(selectionCriteriaController.deleteSelectionCriteria);

    return router;
}


module.exports = selectionCriteriaRouter;