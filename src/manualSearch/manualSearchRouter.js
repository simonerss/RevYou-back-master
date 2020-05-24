const router = require('express').Router();
const manualSearchController = require('./manualSearchController');

const ManualSearchController = () => {

    router.route('/')
    .get(manualSearchController.show)
    .post(manualSearchController.createManualSearch)
    .delete(manualSearchController.deleteManualSearch);

    return router;
}


module.exports = ManualSearchController;