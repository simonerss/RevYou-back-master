const { Study } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { Op, sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');


module.exports = {

    async manualSearchAmount(req, res) {
        // const { ProjectId } = req.body;
        const ProjectId = req.params.projectid;
        const strquery = 'SELECT COUNT("Study"."id") AS Amount FROM "Study" INNER JOIN ' +
            '( "Search" INNER JOIN "ManualSearch" ON "Search"."id" = "ManualSearch"."SearchId" ) ' +
            'ON ( ("Study"."ProjectId" = :projectid) ' +
            'AND ("ManualSearch"."SearchId" = "Study"."SearchId") );';
        const manualSearchAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId },
        });
        const amount = manualSearchAmount[0].amount;
        return res.status(200).json( amount );
    },

    async automaticSearchAmount(req, res) {
        // const { ProjectId } = req.body;
        const ProjectId = req.params.projectid;
        const strquery = 'SELECT COUNT("Study"."id") AS Amount FROM "Study"  JOIN ' +
            '( "Search" INNER JOIN "AutomaticSearch" ON "Search"."id" = "AutomaticSearch"."SearchId" ) ' +
            'ON ( ("Study"."ProjectId" = :projectid) ' +
            'AND ("AutomaticSearch"."SearchId" = "Study"."SearchId") );';
        const automaticSearchAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId },
        });
        const amount = automaticSearchAmount[0].amount;
        return res.status(200).json( amount );
    },

    async automaticSearchMethodAmount(req, res) {
        // const { ProjectId } = req.body;
        const ProjectId = req.params.projectid;
        const strquery = 'SELECT "AutomaticSearch"."method", COUNT("AutomaticSearch"."method") AS amount FROM "Study" INNER JOIN ' +
            '( "Search" INNER JOIN "AutomaticSearch" ON "Search"."id" = "AutomaticSearch"."SearchId" ) ' +
            'ON ( ("Study"."ProjectId" = :projectid) ' +
            'AND ("AutomaticSearch"."SearchId" = "Study"."SearchId") ) ' +
            'GROUP BY "AutomaticSearch"."method";';
        const automaticSearchAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId },
        });
        return res.status(200).json({ automaticSearchAmount });
    },

    async StudyByadaptedQueryAmount(req, res) {
        // const { ProjectId } = req.body;
        const ProjectId = req.params.projectid;
        const strquery = 'SELECT "AdaptedQuery"."query" AS name, COUNT("AdaptedQuery"."query") AS value FROM ' +
            '"Study" INNER JOIN ( "Search" INNER JOIN ( "AutomaticSearch" INNER JOIN "AdaptedQuery" ' +
            'ON "AutomaticSearch"."id" = "AdaptedQuery"."AutomaticSearchId" ) ' +
            'ON  "Search"."id" = "AutomaticSearch"."SearchId") ' +
            'ON (("Study"."SearchId" = "Search"."id") AND ("Study"."ProjectId" = :projectid) ) ' +
            'GROUP BY "AdaptedQuery"."query";';
        const StudyByadaptedQueryAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId },
        });
        return res.status(200).json({ StudyByadaptedQueryAmount });
    },



    async StudyBySearchEngineAmount(req, res) {
        const ProjectId = req.params.projectid;
        const strquery = 'SELECT "SearchEngine"."name", COUNT("Study"."id") AS Amount '+
        'FROM "Study" INNER JOIN ( "Search" INNER JOIN ( "AutomaticSearch" INNER JOIN ( "AdaptedQuery" INNER JOIN "SearchEngine" '+
        'ON "SearchEngine"."id" = "AdaptedQuery"."SearchEngineId" ) '+
        'ON  "AutomaticSearch"."id" = "AdaptedQuery"."AutomaticSearchId") '+
        'ON "Search"."id" = "AutomaticSearch"."SearchId") '+
        'ON ( ("Search"."id" = "Study"."SearchId") AND ("Study"."ProjectId" = :projectid) )'+
        'GROUP BY "SearchEngine"."name";';
        const StudyBySearchEngineAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId },
        });
        return res.status(200).json({ StudyBySearchEngineAmount });
    },

    //faz a contagem pelo campo 'busca' na tabela 'Study'
    async StudyBySearchEngineAmountt(req, res) {
        const ProjectId = req.params.projectid;
        const strquery = 'SELECT "Study"."base", COUNT("Study"."id") AS Amount '+
        'FROM "Study" WHERE "Study"."ProjectId" = :projectid '+
        'GROUP BY "Study"."base" ';
        const StudyBySearchEngineAmountt = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId },
        });
        return res.status(200).json({ StudyBySearchEngineAmountt });
    },//c83b9bdf-476b-4a07-be00-4602a6ebe6e0

    async rejectedByCriteriaAmount(req, res) {
        // const { ProjectId } = req.body;
        const ProjectId = req.params.projectid;
        const rejected = 'rejected';
        const strquery = 'SELECT "SelectionCriteria"."description", COUNT("SelectionResult"."status") AS Amount '+
        'FROM "Study" INNER JOIN ( "SelectionResult" INNER JOIN ( "SelectionCriteria" INNER JOIN "SelectionResultSelectionCriteria" '+
        'ON "SelectionCriteria"."id" = "SelectionResultSelectionCriteria"."SelectionCriteriaId" ) '+
        'ON  "SelectionResult"."id" = "SelectionResultSelectionCriteria"."SelectionResultId") '+
        'ON ( ("Study"."ProjectId" = :projectid) AND ("SelectionResult"."status" = :rejected) ) '+
        'GROUP BY "SelectionCriteria"."description";';
        const rejectedByCriteriaAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId, rejected: rejected },
        });
        return res.status(200).json({ rejectedByCriteriaAmount });
    },

    async acceptedByYearAmount(req, res) {
        const ProjectId = req.params.projectid;
        const accepted = 'accepted';
        const strquery = 'SELECT "Study"."year", COUNT("SelectionResult"."status") AS Amount FROM '+
        '"Study" INNER JOIN  "SelectionResult"  ON (("SelectionResult"."StudyId" = "Study"."id") '+
        'AND ("SelectionResult"."status" = :accepted) AND ("Study"."ProjectId" = :projectid)) GROUP BY "Study"."year"';
        const acceptedByYearAmount = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId, accepted: accepted },
        });
        return res.status(200).json({ acceptedByYearAmount });
    },

    async acceptedBySearchEngineAmount(req, res) {
        // const { ProjectId } = req.body;
        const ProjectId = req.params.projectid;
        const accepted = 'accepted';
        const strquery = 'SELECT "SearchEngine"."name", COUNT ("SelectionResult"."status") AS Amount FROM "SelectionResult" '+
        'INNER JOIN ( "Study" INNER JOIN ("Project" INNER JOIN ("ProjectsSearchEngines" INNER JOIN "SearchEngine" '+
        'ON "ProjectsSearchEngines"."SearchEngineId" = "SearchEngine"."id") '+
        'ON "ProjectsSearchEngines"."ProjectId" = "Project"."id") ON "Study". "ProjectId" = "Project"."id") '+
        'ON ( ("SelectionResult"."StudyId" = "Study"."id") AND ("SelectionResult"."status" = :accepted) '+
        'AND ("Project"."id" = :projectid) ) GROUP BY "SearchEngine"."name";';
        const acceptedBySearchEngine = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId, accepted: accepted },
        });
        return res.status(200).json({ acceptedBySearchEngine });
    },

};