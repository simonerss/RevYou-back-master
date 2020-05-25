require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const dataGraphicRouter = require('./src/dataGraphic/dataGraphicRouter');
const projectResearcherSearchEngineRouter = require('./src/projectResearcherSearchEngine/ProjectResearcherSearchEngineRouter');
const manualSearchRouter = require('./src/manualSearch/manualSearchRouter');
const automaticSearchRouter = require('./src/automaticSearch/automaticSearchRouter');
const searchRouter = require('./src/search/searchRouter');
const researcherRouter = require('./src/researcher/researcherRouter');
const studyRouter = require('./src/study/studyRouter');
const projectRouter = require('./src/project/projectRouter');
const reportRouter = require('./src/project/reportRouter');
const invitationRouter = require('./src/invitation/invitationRouter');
const mainQuestionRouter = require('./src/mainQuestion/mainQuestionRouter');
const secondaryQuestionRouter = require('./src/secondaryQuestion/secondaryQuestionRouter');
const standardQueryRouter = require('./src/standardQuery/standardQueryRouter');
const searchKeywordRouter = require('./src/searchKeyword/searchKeywordRouter');
const selectionCriteriaRouter = require('./src/selectionCriteria/selectionCriteriaRouter');
const languagesRouter = require('./src/language/languageRouter');
const searchEngineRouter = require('./src/searchEngine/searchEngineRouter');
const adaptedQueryRouter = require('./src/adaptedQuery/adaptedQueryRouter');
const extractionStepRouter = require('./src/extractionStep/extractionStepRouter');
const templateFormRouter = require('./src/templateForm/templateFormRouter');
const extractionFormRouter = require('./src/extractionForm/extractionFormRouter');
const extractionDistributionRouter = require('./src/extractionDistribution/extractionDistributionRouter');
const selectionStepRouter = require("./src/selectionStep/selectionStepRouter");
const studyAssignedRouter = require("./src/studyAssigned/studyAssignedRouter");
const formRouter = require("./src/form/formRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.options("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

//routers
app.use("/studyAssigned", studyAssignedRouter());
app.use("/form", formRouter());
app.use("/selection/step", selectionStepRouter());
app.use('/dataGraphic', dataGraphicRouter());
app.use('/projectResearcherSearchEngine', projectResearcherSearchEngineRouter());
app.use('/manualSearch', manualSearchRouter());
app.use('/automaticSearch', automaticSearchRouter());
app.use('/search', searchRouter());
app.use('/researcher', researcherRouter());
app.use('/study', studyRouter());
app.use('/project', projectRouter());
app.use('/report', reportRouter());
app.use('/invitation', invitationRouter());
app.use('/mainQuestion', mainQuestionRouter());
app.use('/secondaryQuestion', secondaryQuestionRouter());
app.use('/standardQuery', standardQueryRouter());
app.use('/searchKeyword', searchKeywordRouter());
app.use('/selectionCriteria', selectionCriteriaRouter());
app.use('/language', languagesRouter());
app.use('/searchEngine', searchEngineRouter());
app.use('/adaptedQuery', adaptedQueryRouter());
app.use('/extraction/template', templateFormRouter());
app.use('/extraction/step', extractionStepRouter());
app.use('/extraction/form', extractionFormRouter());
app.use('/extraction/distribution', extractionDistributionRouter());


const swaggerDocument = require('./docs/documentation.json');
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 5000, console.log("all ready"));

module.exports = app;