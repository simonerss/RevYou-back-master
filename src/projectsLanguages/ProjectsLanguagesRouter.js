const router = require('express').Router();
const projectsLanguagesController = require('./ProjectsLanguagesController');

const projectsLanguagesRouter = () => {
    
    router.route('/')
    .get(projectsLanguagesController.getProjectsLanguages)
    .post(projectsLanguagesController.createProjectsLanguages);
    
    return router;
}

module.exports = projectsLanguagesRouter;