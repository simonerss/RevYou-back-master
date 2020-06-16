const router = require('express').Router();
const ProjectsResearchersController = require('./ProjectsResearchersController');

const projectsResearchsRouter = () => {
    router.route('/')
    .post(ProjectsResearchersController.createProjectsResearchers);

    
    return router;
}


module.exports = projectsResearchsRouter;