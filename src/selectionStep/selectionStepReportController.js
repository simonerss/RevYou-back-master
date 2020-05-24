const { Op, Sequelize, QueryTypes } = require('sequelize');
const { SelectionStep, SelectionResult } = require('../../sequelize/models/index');

module.exports = {

    async getSelectionStepReport(req, res) {
        const StudyId = req.params.studyid;
        const strquery = 'SELECT "SelectionStep"."id" as "ss_id", "SelectionStep"."dateChecker", "SelectionStep"."dateConflicts", ' +
            '"SelectionStep"."method", "SelectionStep"."status" as "ss_status", ' +
            '"SelectionStep"."ratedContent", "SelectionStep"."numCheckerStudy", "SelectionStep"."scoreBoard",' +
            ' "SelectionStep"."createdAt" as "ss_createdat", "SelectionStep"."updatedAt" as "ss_updatedat", ' +
            '"StudyAssigned"."id" as "sa_id", "StudyAssigned"."assignDate", "StudyAssigned"."examinationDate", ' +
            '"StudyAssigned"."status" as "sa_status", "StudyAssigned"."createdAt" as "sa_createdat", ' +
            '"StudyAssigned"."updatedAt" as "sa_updatedat", "Researcher"."id" as "r_id", "Researcher"."id" as "r_id", "Researcher"."name", ' +
            '"Researcher"."email", "Researcher"."createdAt" as "r_createdat", "Researcher"."updatedAt" as ' +
            '"r_updatedat" FROM "SelectionStep" INNER JOIN ("StudyAssigned" INNER JOIN "Researcher" ON ' +
            '"Researcher"."id" = "StudyAssigned"."ResearcherId") ON (("SelectionStep"."id" = "StudyAssigned".' +
            '"SelectionStepId") AND ("StudyAssigned"."StudyId" = :studyid));';
        const studySelectionStepReport = await SelectionStep.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { studyid: StudyId },
        });
        
        return res.status(200).json(studySelectionStepReport);
    },

    async getSpecificSelectionStepReportOLD(req, res) {
        try{
        const SelStepId = req.params.selstepid;
        const result = await SelectionStep.findByPk(SelStepId,
            {
                include: [{
                    association: 'Checker',
                    attributes: ['name', 'email']
                }, {
                    association: 'StudyAssigned',
                    attributes: ['id'],
                    include: [{
                        association: 'Researcher',
                        attributes: ['name', 'email']
                    }]
                }]
            }
            );
        return res.status(200).json(result)
        }catch(err){
            return res.status(500).json({message: 'error arquivo', err});
        }
    },

    async getSpecificSelectionStepReport(req, res) {
        // const StudyId = req.params.studyid;
        const SelStepId = req.params.selstepid;        
        const ResearcherId = req.params.researcherid;        

        const strquery = 'SELECT "SelectionStep"."id", "SelectionStep"."startDate", "SelectionStep"."endDate", '+
        '"SelectionStep"."dateChecker",   "SelectionStep"."dateConflicts", "SelectionStep"."method", '+
        '"SelectionStep"."status", "SelectionStep"."ratedContent", "SelectionStep"."numCheckerStudy", '+
        '"SelectionStep"."scoreBoard", "SelectionStep"."createdAt", "SelectionStep"."updatedAt", '+
        '"Researcher"."name", "Researcher"."email" FROM "SelectionStep" INNER JOIN ("StudyAssigned" INNER JOIN '+
        '"Researcher" ON (("StudyAssigned"."ResearcherId" = "Researcher"."id") AND '+
        '("Researcher"."id" = :researcherid))) ON ( ("StudyAssigned"."SelectionStepId" = "SelectionStep"."id") '+
        'AND ("SelectionStep"."id" = :selstepid) );';
        const studySelectionResultReport = await SelectionResult.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { selstepid: SelStepId, researcherid: ResearcherId },
        });
        return res.status(200).json(studySelectionResultReport[0]);
    },

    async getSelectionResultReport(req, res) {
        const StudyId = req.params.studyid;

        const SelStepId = req.params.selstepid;
        const strquery = 'SELECT ' +
            '"SelectionResult"."id" as "sr_id", "SelectionResult"."status" as "sr_status", ' +
            '"SelectionResult"."createdAt" as "sr_createdat", "SelectionResult"."updatedAt" as ' +
            '"sr_updatedat", "SelectionStepId", "StudyId", "SelectionCriteria"."description" as ' +
            '"sc_desription", "type" as "sc_type" ' +
            'FROM "SelectionResult" INNER JOIN ("SelectionResultSelectionCriteria" ' +
            'INNER JOIN "SelectionCriteria" ON "SelectionResultSelectionCriteria"."SelectionCriteriaId" =  ' +
            '"SelectionCriteria"."id") ON (("SelectionResult"."StudyId" = :studyid) ' +
            'AND ("SelectionResult"."SelectionStepId" = :selstepid))';
        const studySelectionResultReport = await SelectionResult.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { studyid: StudyId, selstepid: SelStepId },
        });
        return res.status(200).json(studySelectionResultReport);
    },

}