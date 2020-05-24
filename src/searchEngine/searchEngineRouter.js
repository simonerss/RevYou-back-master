const router = require('express').Router();
const searchEngineController = require('./searchEngineController');

const searchEngineRouter = () => {
    router.route('/')
    .post(searchEngineController.createSearchEngine)
    .delete(searchEngineController.deleteProjectSearchEngines);

    router.route('/new')
    .post(searchEngineController.newSearchEngine);

    router.route('/:ProjectId')
    .get(searchEngineController.getSearchEngines);

    router.route('/createAssociation')
    .post(searchEngineController.createProjectsSearchEngines);

    return router;
}


module.exports = searchEngineRouter;