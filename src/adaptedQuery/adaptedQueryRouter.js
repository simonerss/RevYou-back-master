const router = require('express').Router();
const adaptedQueryController = require('./adaptedQueryController');

const adaptedQueryRouter = () =>{
    
    router.route('/')
    .get(adaptedQueryController.getAdaptedQuery)
    .post(adaptedQueryController.createAdaptedQuery);

    router.route('/new')
    .post(adaptedQueryController.createAdaptedQueryy);
    
    router.route('/:id')
    .put(adaptedQueryController.updateAdaptedQuery)
    .delete(adaptedQueryController.deleteAdaptedQuery);

    return router;
}

module.exports = adaptedQueryRouter;
