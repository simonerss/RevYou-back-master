const router = require('express').Router();
const searchController = require('./searchController');

const SearchRouter = () => {

    router.route('/')
    .get(searchController.getSearchs)
    .post(searchController.createSearch)
    .delete(searchController.deleteSearch);

    return router;
}

module.exports = SearchRouter;