const { ProjectsSearchEngines, Project, Researcher } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { NOW, sequelize } = require('sequelize');

module.exports = {

    async getProjectsSearchEngines(req, res) {
        const projectsSearchEngines = await ProjectsSearchEngines.findAll();
        return res.json({ projectsSearchEngines });
    },

    async createProjectsSearchEngines(req, res) {
        try {
            const { ProjectId, SearchEngineId } = req.body;
            const projeto = await Project.findAll({ attributes: ['id'], where: { id: ProjectId } });
            const searchEngine = await Researcher.findAll({ attributes: ['id'], where: { id: SearchEngineId } });

            if (!projeto || !searchEngine) {
                return res.status(400).json({ message: 'Algum dos parâmetros é inválido.', err });
            }

            await ProjectsSearchEngines.create({
                ProjectId: ProjectId,
                SearchEngineId: SearchEngineId,
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