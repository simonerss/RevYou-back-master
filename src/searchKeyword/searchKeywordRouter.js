const router = require('express').Router();
const searchKeywordController = require('./searchKeywordController');

const searchKeywordRouter = () => {
    router.route('/')
    .post(searchKeywordController.createSearchKeyword);

    router.route('/:ProjectId')
    .get(searchKeywordController.getSearchKeyword)
    .put(searchKeywordController.updateSearchKeyword);

    return router;
}


module.exports = searchKeywordRouter;