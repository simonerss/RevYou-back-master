const router = require('express').Router();
const adaptedQueryController = require('./adaptedQueryController');

const adaptedQueryRouter = () =>{
    
    router.route('/')
    .get(adaptedQueryController.getAdaptedQuery)
    .post(adaptedQueryController.createAdaptedQuery);

    router.route('/new')
    .post(adaptedQueryController.createAdaptedQuery_);
    
    router.route('/:id')
    .put(adaptedQueryController.updateAdaptedQuery)
    .delete(adaptedQueryController.deleteAdaptedQuery);

    return router;
}

module.exports = adaptedQueryRouter;
