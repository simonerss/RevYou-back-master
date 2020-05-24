const router = require('express').Router();
const invitationController = require('../invitation/invitationController');

const invitationRouter = () => {
    router.route('/')
    .post(invitationController.createInvitation)
    .get(invitationController.getListInvitations);

    router.route('/:id')
    .put(invitationController.updateSituation)
    .delete(invitationController.deleteInvitation);

    router.route('/teste/:ProjectId')
    .get(invitationController.getInvitationAccept);

    router.route('/invitationuser')
    .get(invitationController.getListInvitationsUser);

    router.route('/invitationuser/filter')
    .get(invitationController.getListInvitationsUserFilter);

    return router;
}


module.exports = invitationRouter;