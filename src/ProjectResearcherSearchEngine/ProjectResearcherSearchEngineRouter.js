const router = require('express').Router();
const ProjectResearcherSearchEngineController = require('./ProjectResearcherSearchEngineController');

const projectResearchSearchEngine = () => {
    router.route('/')
    .post(ProjectResearcherSearchEngineController.createProjectResearcherSearchEngine)
    .delete(ProjectResearcherSearchEngineController.deleteProjectResearcherSearchEngine);
    
    router.route('/:projectid')
    .get(ProjectResearcherSearchEngineController.getProjectResearcherSearchEngine)

    
    return router;
}


module.exports = projectResearchSearchEngine;