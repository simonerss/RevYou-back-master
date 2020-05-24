const router = require('express').Router();
const projectReportController = require('../project/projectReportController');

const reportRouter = () => {
    router.route('/')
    .get(projectReportController.showy); 

    router.route('/search')
    .get(projectReportController.searchProject);  
    
    router.route('/show/:id')
    .get(projectReportController.show);  
    
    router.route('/aboutproject/:projectid')
    .get(projectReportController.aboutProject);  

    router.route('/mainquestion/:projectid')
    .get(projectReportController.getMainQuestion);  
    
    router.route('/standardQuery/:projectid')
    .get(projectReportController.getStandardQuery);  
    
    router.route('/filter/title/:title/reviewType/:reviewType/coordinatorName/:coordinatorName/researcherName/:researcherName/end')
    .get(projectReportController.filters);

    return router;
}

module.exports = reportRouter;