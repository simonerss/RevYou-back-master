const { ProjectsResearchers, Project, Researcher } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { NOW, sequelize } = require('sequelize');

module.exports = {

    async createProjectsResearchers(req, res) {
        try {
            const { ProjectId, ResearcherId } = req.body;
            const projeto = await Project.findAll({ attributes: ['id'], where: { id: ProjectId } });
            const researcher = await Researcher.findAll({ attributes: ['id'], where: { id: ResearcherId } });

            if (!projeto || !researcher) {
                return res.status(400).json({ message: 'Algum dos parâmetros é inválido.', err });
            }

            await ProjectsResearchers.create({
                ProjectId: ProjectId,
                ResearcherId: ResearcherId,
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