const router = require('express').Router();
const manualSearchController = require('./manualSearchController');

const ManualSearchRouter = () => {

    router.route('/')
    .get(manualSearchController.show)
    .post(manualSearchController.createManualSearch)
    .delete(manualSearchController.deleteManualSearch);

    return router;
}


module.exports = ManualSearchRouter;