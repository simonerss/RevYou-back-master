const { AdaptedQuery, SearchEngine } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createAdaptedQuery = async (req, res) => {
    try {
        const { ProjectId, query, adaptedDate, importDate, search, base } = req.body;
        const result = await SearchEngine.findOne({ where: { name: base }, attributes: ['id'] });
        AdaptedQuery.findOrCreate({
            where: { ProjectId, search }, defaults: {
                id: uuid(),
                query,
                adaptedDate,
                importDate,
                search,
                ProjectId,
                SearchEngineId: result.dataValues.id
            }
        })
            .spread((researcher, created) => {
                researcher.get({
                    plain: true
                });
                if (created === true) {
                    return res.status(201).send('adaptedQuery cadastrado com sucesso');
                } else {
                    return res.status(401).send('email ja cadastrado');
                }
            });
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }
}

const createAdaptedQueryy = async (req, res) => {
    try {
        const { ProjectId, query, adaptedDate, importDate, search, base, AutomaticSearchId, StandardQueryId } = req.body;
        const result = await SearchEngine.findOne({ where: { name: base }, attributes: ['id'] });
        AdaptedQuery.findOrCreate({
            where: { ProjectId, search }, defaults: {
                id: uuid(),
                query,
                adaptedDate,
                importDate,
                search,
                ProjectId,
                SearchEngineId: result.dataValues.id,
                AutomaticSearchId, 
                StandardQueryId, 
            }
        })
            .spread((researcher, created) => {
                researcher.get({
                    plain: true
                });
                if (created === true) {
                    return res.status(201).send('pesquisador cadastrado com sucesso');
                } else {
                    return res.status(401).send('email ja cadastrado');
                }
            });
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }
}

/*
const getAdaptedQuery = async (req, res) => {
    try {
        const {ProjectId, search, base} = req.query;
        const searchEngine = await SearchEngine.findOne({where: {name: base}, attributes:['id']});
        const result = await AdaptedQuery.findOne({where: {
            ProjectId, 
            search, 
            SearchEngineId : searchEngine.dataValues.id
        }});
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({message: 'error', err}); 
    }
}
*/

const getAdaptedQuery = async (req, res) => {
    try {
        const { ProjectId, search, base } = req.body;
        const adaptedQuery = await AdaptedQuery.findAll({
            where: { ProjectId },
            attributes: ['id', 'query'],
            include: [
                { 
                    association: 'AutomaticSearch', 
                    where: { id: search },
                    required: false
                },{
                    association: 'SearchEngine',
                    where: { name: base},
                    required: false
                }
            ]
        });
        return res.status(200).json(adaptedQuery);
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }
}


const updateAdaptedQuery = async (req, res) => {
    try {
        const { id } = req.params;
        const { query, adaptedDate, importDate } = req.body;
        await AdaptedQuery.update({ query, adaptedDate, importDate }, { where: { id } });
        return res.status(200).json('atualizado com sucesso');
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }
}

const deleteAdaptedQuery = async (req, res) => {
    try {
        const { id } = req.params;
        await AdaptedQuery.destroy({ where: { id } });
        return res.status(200).json('deletado com sucesso');
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }
}

module.exports = {
    createAdaptedQuery,
    createAdaptedQueryy,
    getAdaptedQuery,
    updateAdaptedQuery,
    deleteAdaptedQuery
}