const { ProjectResearcherSearchEngine, Project, Researcher, SearchEngine } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

module.exports = {

    async createProjectResearcherSearchEngine(req, res){
        try {
            const { ProjectId, ResearcherId, SearchEngineId } = req.body;
            const projeto = await Project.findAll({ attributes: ['id'], where: { id: ProjectId } });
            const researcher = await Researcher.findAll({ attributes: ['id'], where: { id: ResearcherId } });
            const searchEngine = await SearchEngine.findAll({ attributes: ['id'], where: { id: SearchEngineId } });

            if(!projeto || !researcher || !searchEngine){
                return res.status(400).json({ message: 'Algum dos parâmetros é inválido.', err });
            }

            await ProjectResearcherSearchEngine.create({
                id: uuid(), 
                ProjectId: ProjectId, 
                ResearcherId: ResearcherId, 
                SearchEngineId: SearchEngineId
            })
            .then(() => {
                return res.status(201).json('Distribuição criada.');
            }).catch(() => {
                return res.status(500).json('Falha ao distribuir bases entre os Pesquisadores.');
            });
        } catch (error) {
            return res.status(500).json({ message: 'error interno', error });
        }
    },

    async getProjectResearcherSearchEngine(req, res){
        try {
            // const { ProjectId } = req.body;
            const ProjectId = req.params.projectid;
            const projeto = await Project.findAll({ attributes: ['id'], where: { id: ProjectId } });

            if(!projeto){
                return res.status(400).json({ message: 'O id informado não é de um projeto.', err });
            }

            const distribuition = await ProjectResearcherSearchEngine.findAll({ 
                where: { ProjectId },
                include: [
                    { 
                        association: 'Project', 
                        attributes: ['title'],
                    },
                    { 
                        association: 'Researcher', 
                        attributes: ['name', 'email'],
                    },
                    { 
                        association: 'SearchEngine',                         
                        attributes: ['name'],
                    }
                ]
            
            });

            if (distribuition) {
                return res.status(201).json(distribuition);
            } else {
                return res.status(401).json({ message: 'Main Question não existe' });
            }
        } catch (err) {
            return res.status(500).send('error');
        }
    },

    async deleteProjectResearcherSearchEngine(req, res){
        try {
            const { id } = req.body;
            const distribuition = await ProjectResearcherSearchEngine.findByPk(id);
            const del = distribuition.destroy();
            if (del) {
                return res.status(200).json({ message: "Distribuição deletada" });
            } else {
                return res.status(400).json({ message: 'falha ao deletar distribuição' });
            }
        } catch (err) {
            return res.status(500).send('falha interna');
        }
    }


}