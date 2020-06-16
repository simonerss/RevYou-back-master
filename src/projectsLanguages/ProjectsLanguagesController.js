const { ProjectsLanguages, Project, Language } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { NOW, sequelize } = require('sequelize');

module.exports = {

    async getProjectsLanguages(req, res) {
        const projectsLanguages = await ProjectsLanguages.findAll();
        return res.json({ projectsLanguages });
    },

    async createProjectsLanguages(req, res) {
        try {
            const { ProjectId, LanguageId } = req.body;
            const projeto = await Project.findAll({ attributes: ['id'], where: { id: ProjectId } });
            const language = await Language.findAll({ attributes: ['id'], where: { id: LanguageId } });

            if (!projeto || !language) {
                return res.status(400).json({ message: 'Algum dos parâmetros é inválido.', err });
            }

            await ProjectsLanguages.create({
                ProjectId: ProjectId,
                LanguageId: LanguageId,
            })
                .then(() => {
                    return res.status(201).json({ message: 'Associação criada.' });
                }).catch(() => {
                    return res.status(500).json({ message: 'Falha ao criar associação.' });
                });
        } catch (error) {
            return res.status(500).json({ message: 'error interno', error });
        }
    }
}