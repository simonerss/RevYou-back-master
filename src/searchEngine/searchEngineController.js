const { SearchEngine, Project } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");


const extra = async (req, res) => {
    return res.status(500).json({ message: 'tudo ok'});
}

const newSearchEngine = async (req, res) => {
    try {
        const { name } = req.body;

        const [base] = await SearchEngine.findOrCreate({
            where: { name },
            defaults: {
                id: uuid(),
                name
            }
        });
        return res.status(201).send('Search Engine cadastrada com sucesso', base);
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

const createSearchEngine = async (req, res) => {
    try {
        const { bases } = req.body;
        const result = bases.map(async base => {
            return await SearchEngine.findOrCreate({
                where: { name: base }, defaults: {
                    id: uuid(),
                    name: base
                }
            })
        })
        await Promise.all(result)
        return res.status(201).send('Search Engine cadastrada com sucesso');
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

const createProjectsSearchEngines = async (req, res) => {
    try {
        const { bases, ProjectId } = req.body
        const project = await Project.findByPk(ProjectId);
        const result = bases.map(async base => {
            const searchEngine = await SearchEngine.findOne({ where: { name: base } });
            return await project.addSearchEngines(searchEngine);
        })
        await Promise.all(result)
        return res.status(201).send('Search Engine associada com o projeto com sucesso');
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

const getSearchEngines = async (req, res) => {
    try {
        const { ProjectId } = req.params;
        const searchEngine = await Project.findAll({
            include: [{
                model: SearchEngine,
                association: "SearchEngines",
                attributes: ['name']
            }],
            attributes: ['id'],
            where: { id: ProjectId }
        })
        return res.status(200).json(searchEngine);
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

const deleteProjectSearchEngines = async (req, res) => {
    try {
        const { ProjectId, bases } = req.query;
        const project = await Project.findByPk(ProjectId);
        const result = bases.map(async base => {
            const searchEngine = await SearchEngine.findOne({ where: { name: base } });
            return await project.removeSearchEngines(searchEngine);
        })
        await Promise.all(result)
        return res.status(200).json('deletado com sucesso');
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

module.exports = {
    extra,
    newSearchEngine,
    createSearchEngine,
    createProjectsSearchEngines,
    getSearchEngines,
    deleteProjectSearchEngines
}