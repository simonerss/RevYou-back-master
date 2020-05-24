const { Study, ExtractionStep, Researcher } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { Op, sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');


module.exports = {
    async acceptedBySearchEngineAmount(req, res) {
        const { ProjectId } = req.body;
        const strquery = 'SELECT "SearchEngine"."name", COUNT ("SelectionResult"."status") AS Amount FROM "SelectionResult" ' +
            'INNER JOIN ( "Study" INNER JOIN ("Project" INNER JOIN ("ProjectsSearchEngines" INNER JOIN "SearchEngine" ' +
            'ON "ProjectsSearchEngines"."SearchEngineId" = "SearchEngine"."id") ' +
            'ON "ProjectsSearchEngines"."ProjectId" = "Project"."id") ON "Study". "ProjectId" = "Project"."id") ' +
            'ON ( ("SelectionResult"."StudyId" = "Study"."id") AND ("SelectionResult"."status" = :accepted) ' +
            'AND ("Project"."id" = :projectid) ) GROUP BY "SearchEngine"."name";';
        const acceptedBySearchEngine = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId, accepted: accepted },
        });
        return res.status(200).json({ acceptedBySearchEngine });
    },

    async getExtractionStepsList(req, res) {
        const ProjectId = req.params.projectid;
        let extractionSteps = await ExtractionStep.findAll({
            where: { ProjectId: ProjectId },
            // include: [
            //     {
            //         model: Researcher,
            //         association: "Extractor",
            //         attributes: ['id', 'name', 'email']
            //     },
            //     {
            //         model: Researcher, 
            //         association: "Decisor",
            //         attributes: ['id', 'name', 'email']
            //     }
            // ]
        });
        return res.status(200).json(extractionSteps);
    },
};