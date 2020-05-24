const router = require('express').Router();
const form = require('./formController');

const formRouter = () =>{
    
    router.route("/")
    .get(form.getForms); 

    router.route("/distribution/:projectid/:researcherid")
    .get(form.getStudiesExtractionDistribuition); 

    router.route("/data/extraction/:formid")
    .get(form.getDataExtraction);    
    
    router.route("/fields/:templateformid")
    .get(form.getFields);    

    return router;    
}

module.exports = formRouter;