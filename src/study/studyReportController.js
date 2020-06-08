const { Op, Sequelize, QueryTypes } = require('sequelize');
const { Study, Search } = require('../../sequelize/models/index');

module.exports = {

    async dataStudyExtraction(req, res) {
        try {
            const { StudyId } = req.body;    
            return res.status(200).json(StudyId);
        } catch (error) {
            return res.status(500).json({ message: 'error', error });
        }
    },

    async dataStudyExtractionOLD(req, res) {
        try {
            const { StudyId } = req.body;
            const dataStudyExtraction = await Study.findAll({
                attributes: ['id', 'title', 'authors', 'citekey', 'abstract', 'keywords', 'venue', 'year',
                    'pages', 'volume', 'url', 'issn', 'doi', 'base', 'search', 'generalStatus', 'venueType'],
                where: { id: StudyId },
                include: [{
                    association: 'Form',
                    attributes: ['type', 'status'],
                    include: [{
                        association: 'TemplateForm',
                        attributes: ['id'],
                        include: [{
                            association: 'Field',
                            attributes: ['type', 'description', 'option', 'position'],
                            include: [{
                                attributes: ['content', 'supportData', 'option', 'status'],
                                association: 'Answer',
                            }],
                        }],
                    }],
                    include: [{ association: 'Researcher', attributes: ['name', 'email'] }],
                }]
            });
            if (!dataStudyExtraction) {
                return res.status(400).json({ message: 'Nenhum estudo encontrado.' });
            }
            return res.status(200).json(dataStudyExtraction);
        } catch (error) {
            return res.status(500).json({ message: 'error', error });
        }
    },

    async filters(req, res) {
        const { ProjectId, title, searchEngine, generalStatus, year, searchMode, adaptedQuery } = req.body;
        const studies = await Study.findAll({
            attributes: ['id', 'title', 'authors', 'citekey', 'abstract', 'keywords', 'venue', 'year',
                'pages', 'volume', 'url', 'issn', 'doi', 'base', 'search', 'generalStatus', 'venueType'],
            where: {
                ProjectId: ProjectId,
                base: searchEngine, //nome da base onde foi encontrado
                title: { [Op.iLike]: `%${title}%` },
                generalStatus: generalStatus, //defauts:'Unclassified', 'Duplicated', 'Included', 'Excluded' 
                year: year,
            },
            include: [{
                association: 'Search',
                include: [{
                    association: 'AutomaticSearch',
                    where: { id: searchMode },
                    required: false,
                    include: [{
                        association: 'AdaptedQuery',
                        where: { id: adaptedQuery },
                        required: false,
                    }]
                }],
                include: [{
                    association: 'ManualSearch',
                    where: { id: searchMode },
                    required: false,
                }],
            }]
        });
        if (studies == []) {
            return res.status(400).json({ message: 'Nenhum artigo foi encontrado.' });
        }
        return res.status(200).json({ studies });
    },

    async getAllStudies(req, res) {
        const ProjectId = req.params.projectid;
        const studies = await Study.findAll({
            attributes: ['id', 'title', 'authors', 'citekey', 'abstract', 'keywords', 'venue', 'year',
                'pages', 'volume', 'url', 'issn', 'doi', 'base', 'search', 'generalStatus', 'venueType', 'createdAt', 'updatedAt', 'ProjectId', 'SearchId'],
            where: { ProjectId }            
        });
        if (studies == []) {
            return res.status(400).json({ message: 'Nenhum artigo foi encontrado.' });
        }
        return res.status(200).json( studies );
    },
    
    async getStudyData(req, res) {
        const StudyId = req.params.studyid;
        const study = await Study.findByPk(StudyId);
        if (!study) {
            return res.status(400).json({ message: 'O artigo não foi encontrado.' });
        }
        return res.status(200).json( study );
    },

    async getStudiesIdentifiedByManualSearch(req, res) {
        const ProjectId = req.params.projectid;
        const studies = await Study.findAll({
            attributes: ['id', 'title', 'authors', 'citekey', 'abstract', 'keywords', 'venue', 'year',
                'pages', 'volume', 'url', 'issn', 'doi', 'base', 'search', 'generalStatus', 'venueType'],
            where: { ProjectId },
            include:[{
                association: 'Search',
                where: { ProjectId },
                required:true,
                include:[{
                    association:'ManualSearch',
                    required: true
                }]
            }]          
        });
        if (studies == []) {
            return res.status(400).json({ message: 'Nenhum artigo foi encontrado.' });
        }
        return res.status(200).json( studies );
    },

    //o método statusNumber() deverá ser removido para selectionStep no futuro
    async studyStatusAmount(req, res) {
        const { ProjectId, SelectionStepId } = req.body;
        // falta association selectioStep
        const StudyStatusAmount = await Study.findAll({
            where: { ProjectId: ProjectId },
            group: ['generalStatus'],
            attributes: ['generalStatus', [Sequelize.fn('COUNT', 'generalStatus'), 'amount']],
        });
        return res.status(200).json({ StudyStatusAmount });
    },

    async identifiedByManualSearch(req, res) {
        const { ProjectId } = req.body;
        const searchs = await Search.findAll({ where: { ProjectId } });
        const studies = await Study.findAll({
            where: { ProjectId },
            include: [{
                association: 'Search',
                include: [{ association: 'ManualSearch' }]
            }]
        });
        return res.status(200).json({ studies });
    },

    async IncludedYear(req, res) {
        const { ProjectId } = req.body;
        const StudyByYearAmount = await Study.findAll({
            where: { ProjectId: ProjectId },
            group: ['year'],
            attributes: ['year', [Sequelize.fn('COUNT', 'year'), 'amount']],
        });
        return res.status(200).json({ StudyByYearAmount });
    },

    async getStudiesInConflict(req, res) {        
        const ProjectId = req.params.projectid;
        const inconflict = 'in_conflict';
        const strquery = 'SELECT DISTINCT '+
            '"Study"."id", "Study"."title", "Study"."authors", "Study"."citekey", '+
            '"Study"."abstract", "Study"."keywords", "Study"."venue", "Study"."year", '+
            '"Study"."pages", "Study"."volume", "Study"."url", "Study"."issn", "Study"."doi", '+
            '"Study"."base", "Study"."search", "Study"."generalStatus", "Study"."venueType", '+
            '"Study"."createdAt", "Study"."updatedAt" '+
            'FROM "Study" INNER JOIN "SelectionResult" ON ( ("Study"."ProjectId" = :projectid) '+
            'AND ("SelectionResult"."status" = :inconflict) );';
        const studiesInConflict = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId, inconflict: inconflict },
        });
        return res.status(200).json(studiesInConflict);
    },

    async getStudiesInExtractionConflict(req, res) {
        const ProjectId = req.params.projectid;
        const inconflict = 'in_conflict';
        const strquery = 'SELECT ' +
            '"Study"."id", "Study"."title", "Study"."authors", "Study"."citekey", "Study"."abstract", ' +
            '"Study"."keywords", "Study"."venue", "Study"."year", "Study"."pages", "Study"."volume",  ' +
            '"Study"."url", "Study"."issn", "Study"."doi", "Study"."base", "Study"."search",  "Study"."generalStatus", ' +
            '"Study"."venueType", "Study"."createdAt", "Study"."updatedAt", "Study"."ProjectId", "Study"."SearchId",' +
            ' "Form"."id" as "form_id", "Form"."type", "Form"."status" as "form_status", "Form"."createdAt" as ' +
            '"form_createdat", "Form"."updatedAt" as "form_updatedat", "Form"."TemplateFormId", "Form"."StudyId", ' +
            '"Form"."ResearcherId", "Answer"."id" as "answer_id", "Answer"."content", "Answer"."supportData", ' +
            '"Answer"."option", "Answer"."status" as "answer_status", "Answer"."createdAt" as "answer_createdat", ' +
            '"Answer"."updatedAt" as "answer_updatedat", "Answer"."FormId", "Answer"."FieldId" ' +
            ' FROM "Study" INNER JOIN ("Form" INNER JOIN "Answer" ON ' +
            '(("Answer"."FormId" = "Form"."id") AND ("Answer"."status" = :inconflict))) ON ' +
            '(("Form"."StudyId" = "Study"."id") AND ' +
            '("Study"."ProjectId" = :projectid))';
        const studiesInExtractionConflict = await Study.sequelize.query(strquery, {
            type: QueryTypes.SELECT,
            replacements: { projectid: ProjectId, inconflict: inconflict },
        });
        return res.status(200).json(studiesInExtractionConflict);
    },
}

