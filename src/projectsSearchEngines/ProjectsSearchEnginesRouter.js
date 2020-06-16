const router = require('express').Router();
const ProjectsSearchEnginesController = require('./ProjectsSearchEnginesController');

const projectsSearchEnginesRouter = () => {
    
    router.route('/')
    .get(ProjectsSearchEnginesController.getProjectsSearchEngines)
    .post(ProjectsSearchEnginesController.createProjectsSearchEngines);
    
    return router;
}

module.exports = projectsSearchEnginesRouter;