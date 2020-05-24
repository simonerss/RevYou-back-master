const {Language, Project} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createLanguage = async (req, res) => {
    try {
        const {languages} = req.body;
        const result = languages.map(async language => {
            return await Language.findOrCreate({where: {studiesLanguage : language}, defaults: {
                id: uuid(),
                studiesLanguage: language
            }});
        });
        await Promise.all(result);
        return res.status(201).send('Language cadastrada com sucesso');
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

const createProjectsLanguages = async (req, res) => {
    try {
        const {languages, ProjectId} = req.body
        const project = await Project.findByPk(ProjectId);
        const result = languages.map(async language => {
            const languageRes = await Language.findOne({where: {studiesLanguage : language}});
            return await project.addLanguagues(languageRes); 
        })
        await Promise.all(result);
        return res.status(201).send('Language associada com o projeto com sucesso');
    } catch (err) {
        return res.status(500).json({message: 'error interno' , err});
    }
}

const getLanguages = async (req, res) => {
    try {
        const {ProjectId} = req.params;
        const languages = await Project.findAll({
            include: [{
                model: Language, 
                association: "Languagues", 
                attributes:['studiesLanguage']
            }], 
            attributes:['id'],
            where: {id: ProjectId}
        })
        return res.status(200).json(languages);
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

const deleteProjectLanguages = async (req, res) => {
    try {
        const {ProjectId, languages} = req.query;
        const project = await Project.findByPk(ProjectId);
        const result = languages.map(async language => {
            const languageRes = await Language.findOne({where: {studiesLanguage: language}});
            return await project.removeLanguagues(languageRes);
        })
        await Promise.all(result)
        return res.status(200).json('deletado com sucesso');
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

module.exports = {
    createLanguage,
    createProjectsLanguages,
    getLanguages,
    deleteProjectLanguages
}