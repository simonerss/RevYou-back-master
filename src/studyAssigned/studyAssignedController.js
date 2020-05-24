const { StudyAssigned } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const {sequelize, Op} = require('sequelize');
const { QueryTypes } = require('sequelize');

const getStudyAssigned = async (req, res) => {
    const studyAssigned = await StudyAssigned.findAll({ });
    return res.status(200).json({ studyAssigned });
};

const getStudyAssignedDistribuitionOLD = async (req, res) => {
    // const { ProjectId } = req.body;
    const ProjectId = req.params.projectid;
    
    const studyAssigned = await StudyAssigned.findAll({
        attributes: ['id', 'assignDate', 'examinationDate', 'status', 'createdAt', 'updatedAt'],
        include: [
            {
                association: 'Study',
                attributes: ['id', 'title'],
            }, {
                association: 'SelectionStep',
                where: { ProjectId: ProjectId },
                required: true,
                attributes: ['id'],
            }, {
                association: 'Researcher',
                attributes: ['name', 'email'],
            }
        ],
    });
    return res.status(200).json(studyAssigned);
};

const getStudyAssignedDistribuition = async (req, res) => {
    const ProjectId = req.params.projectid;
    
    const strquery = 'SELECT * FROM "Study" '+
    'INNER JOIN ("StudyAssigned" INNER JOIN "Researcher" '+
    'ON "StudyAssigned"."ResearcherId" = "Researcher"."id" ) '+
    ' ON (( "StudyAssigned"."StudyId" = "Study"."id" ) AND '+
    '("Study"."ProjectId" = :projectid)) ';
    const selectionDistribuition = await StudyAssigned.sequelize.query(strquery, {
        type: QueryTypes.SELECT,
        replacements: { projectid: ProjectId },
    });
    
    return res.status(200).json( selectionDistribuition );
};

const getStudyAssignedDistribuitionByResearcher = async (req, res) => {
    const ProjectId = req.params.projectid;
    const ResearcherId = req.params.researcherid;
    
    const strquery = 'SELECT "Study"."id" as "s_id", "Study"."title", "Study"."authors", '+
    '"Study"."citekey", "Study"."abstract", "Study"."keywords", "Study"."venue", "Study"."year", '+
    '"Study"."pages", "Study"."volume", "Study"."url", "Study"."issn", "Study"."doi", "Study"."base", '+
    '"Study"."search", "Study"."generalStatus", "Study"."venueType", "Study"."createdAt", '+
    '"Study"."updatedAt", "Study"."ProjectId", "Study"."SearchId", "StudyAssigned"."assignDate", '+
    '"StudyAssigned"."examinationDate", "StudyAssigned"."status", "StudyAssigned"."SelectionStepId", '+
    '"StudyAssigned"."StudyId", "StudyAssigned"."ResearcherId", "Researcher"."name", '+
    '"Researcher"."email" '+
    'FROM "Study" INNER JOIN ("StudyAssigned" INNER JOIN "Researcher" '+
    'ON (("StudyAssigned"."ResearcherId" = "Researcher"."id") AND '+
    '("Researcher"."id" = :researcherid))) '+
    'ON (( "StudyAssigned"."StudyId" = "Study"."id" ) AND '+
    '("Study"."ProjectId" = :projectid))';
    const selectionDistribuition = await StudyAssigned.sequelize.query(strquery, {
        type: QueryTypes.SELECT,
        replacements: { projectid: ProjectId, researcherid: ResearcherId },
    });
    
    return res.status(200).json( selectionDistribuition );
};

const getStudyAssignedByResearcher = async (req, res) => {
    const { ResearcherId, ProjectId, GeneralStatus } = req.body;
    const studyAssigned = await StudyAssigned.findAll({
        where: { ResearcherId: ResearcherId },
        attributes: ['id', 'assignDate', 'examinationDate', 'status'],
        include: [
            {
                association: 'Study',
                attributes: ['id', 'title', 'authors', 'venueType', 'year', 'generalStatus'],
                required: true,
                where: { generalStatus: GeneralStatus },
            }, {
                association: 'SelectionStep',
                where: { ProjectId: ProjectId },
                required: true,
                attributes: ['id', 'startDate', 'endDate'],
            }, {
                association: 'Researcher',
                attributes: ['name'],
            }
        ],
    });
    return res.status(200).json({ studyAssigned });
};

const getStatusSelectionResultsAmount = async (req, res) => {
    // const { ProjectId } = req.body;
    const ProjectId = req.params.projectid;
    const strquery = 'SELECT "SelectionResult"."status", COUNT("SelectionResult"."status") AS Amount FROM "SelectionResult" ' +
        'INNER JOIN "SelectionStep" ' +
        'ON ( ("SelectionResult"."SelectionStepId" = "SelectionStep"."id") ' +
        'AND ("SelectionStep"."ProjectId" = :projectid) ) ' +
        'GROUP BY "SelectionResult"."status";';
    const StudyStatusAmount = await StudyAssigned.sequelize.query(strquery, {
        type: QueryTypes.SELECT,
        replacements: { projectid: ProjectId },
    });
    
    return res.status(200).json({ StudyStatusAmount });
};

module.exports = {
    getStudyAssigned,
    getStudyAssignedDistribuitionOLD,
    getStudyAssignedDistribuition,
    getStudyAssignedDistribuitionByResearcher,
    getStudyAssignedByResearcher,
    getStatusSelectionResultsAmount,
}