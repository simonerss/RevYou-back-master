const router = require('express').Router();
const ProjectsResearchersController = require('./ProjectsResearchersController');

const projectsResearchsRouter = () => {
    
    router.route('/')
    .get(ProjectsResearchersController.getProjectsResearchers)
    .post(ProjectsResearchersController.createProjectsResearchers);
    
    return router;
}

module.exports = projectsResearchsRouter;