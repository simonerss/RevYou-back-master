const router = require('express').Router();
const ProjectsResearchersController = require('./ProjectsResearchersController');

const projectsResearchsRouter = () => {
    router.route('/')
    .get((req, res) => { return res.json({ hello: "world" }) })
    .post(ProjectsResearchersController.createProjectsResearchers);

    
    return router;
}


module.exports = projectsResearchsRouter;