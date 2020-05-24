const router = require('express').Router();
const automaticSearchController = require('./automaticSearchController');

const AutomaticSearchRouter = () => {

    router.route('/')
    .get(automaticSearchController.getAutomaticSearch)
    .post(automaticSearchController.createAutomaticSearch)
    .delete(automaticSearchController.deleteAutomaticSearch);

    return router;
}


module.exports = AutomaticSearchRouter;