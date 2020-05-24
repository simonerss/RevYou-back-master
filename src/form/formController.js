const { Form, TemplateForm, Researcher, Study, Answer, Field, ExtractionStep } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { sequelize, Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

const getForms = async (req, res) => {
    return res.status(200).json({ message: "ok" });
};

const getFields = async (req, res) => {
    const templateFormId = req.params.templateformid;

    const strquery = 'Select "Field"."id" as "field_id", "Field"."description", ' +
        '"Field"."option" as "field_option", "Field"."type", "Field"."position", "Answer"."id" as ' +
        '"answer_id", "Answer"."content", "Answer"."supportData", "Answer"."option" as "answer_option", ' +
        '"Answer"."status"  from "Field" inner join "Answer" on (("Field"."TemplateFormId" = :templateformid) ' +
        'AND ("Answer"."FieldId" = "Field"."id"))';
    const fieldsList = await Field.sequelize.query(strquery, {
        type: QueryTypes.SELECT,
        replacements: { templateformid: templateFormId },
    });

    return res.status(200).json(fieldsList);
};

const getDataExtraction = async (req, res) => {
    try {
        const formId = req.params.formid;
        let dataExtraction = await Form.findOne({
            where: { id: formId },
            include: [
                {
                    model: Researcher,
                    association: "Researcher",
                    attributes: ['name', 'email'],
                },
                {
                    model: Study,
                    association: "StudyOwner"
                },
                {
                    model: TemplateForm,
                    association: "TemplateForm",
                    include: [
                        {
                            model: Field,
                            association: "Field",
                            attributes: ['id'],
                            include: [{
                                model: Answer,
                                association: "Answer",
                            }]
                        }, {
                            model: ExtractionStep,
                            association: "ExtractionStep",
                            attributes: ['id', 'startDate', 'endDate', 'dateExtractor', 'dateConflicts',
                                'method', 'status', 'numExtractorStudy', 'scoreBoard'],
                            include: [{
                                model: Researcher,
                                attributes: ['id'],
                                association: "Extractor",
                            }, {
                                model: Researcher,
                                attributes: ['id'],
                                association: "Decisor",
                            }]
                        }
                    ]
                },
            ]
        });

        if (dataExtraction) {
            return res.status(202).send(dataExtraction);
        } else {
            return res.status(404).send({ dataExtraction, message: "Extraction Step wasn't found." });
        }
    } catch (err) {
        return res.status(500).send("Sorry, we are unable to get the Extraction Step as requested.");
    }
    // return res.status(202).send(formId);
};

const getStudiesExtractionDistribuition = async (req, res) => {
    const ProjectId = req.params.projectid;
    const ResearcherId = req.params.researcherid;

    const strquery = 'SELECT "Form"."id" as "form_id", "Form"."type","Form"."status", "Form"."createdAt", ' +
        '"Form"."updatedAt", "Form"."TemplateFormId", "Form"."ResearcherId", "Study"."id" as "study_id", ' +
        '"Study"."title", "Study"."authors", "Study"."citekey", "Study"."abstract", "Study"."keywords", ' +
        '"Study"."venue", "Study"."year", "Study"."pages", "Study"."volume", "Study"."url", "Study"."issn", ' +
        '"Study"."doi", "Study"."base", "Study"."search", "Study"."generalStatus", "Study"."venueType", ' +
        '"Study"."ProjectId", "Study"."SearchId" FROM "Form" INNER JOIN "Study" ' +
        'ON ( ("Form"."StudyId" = "Study"."id") AND ("Form"."ResearcherId" = :researcherid) AND ' +
        '("Study"."ProjectId" = :projectid) )';
    const extractionDistribuition = await Form.sequelize.query(strquery, {
        type: QueryTypes.SELECT,
        replacements: { projectid: ProjectId, researcherid: ResearcherId },
    });

    return res.status(200).json(extractionDistribuition);
};


module.exports = {
    getForms,
    getFields,
    getDataExtraction,
    getStudiesExtractionDistribuition
}