const router = require('express').Router();
const projectController = require('../project/projectController');

const projectRouter = () => {
    router.route('/')
    .post(projectController.createProject);

    router.route('/:id')
    .get(projectController.getProject)
    .put(projectController.updateProject)
    .delete(projectController.deleteProject);

    router.route('/invites/:email')
    .get(projectController.getPendingInvitations);

    router.route('/inviteresearcher')
    .post(projectController.inviteResearcher);
    
    router.route('/inviteds/:ProjectId')
    .get(projectController.getInvited);

    return router;
}
module.exports = projectRouter;