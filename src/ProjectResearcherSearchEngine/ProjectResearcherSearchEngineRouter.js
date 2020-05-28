const router = require('express').Router();
const ProjectResearcherSearchEngineController = require('./ProjectResearcherSearchEngineController');

const projectResearchSearchEngineRouter = () => {
    router.route('/')
    .post(ProjectResearcherSearchEngineController.createProjectResearcherSearchEngine)
    .delete(ProjectResearcherSearchEngineController.deleteProjectResearcherSearchEngine);
    
    router.route('/:projectid')
    .get(ProjectResearcherSearchEngineController.getProjectResearcherSearchEngine)

    
    return router;
}


module.exports = projectResearchSearchEngineRouter;