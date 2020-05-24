const { Op } = require('sequelize');
const { ManualSearch, Study } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");


module.exports = {
    async show(req, res) {
        const manualSearchs = await ManualSearch.findAll();
        return res.json({ manualSearchs });
    },

    async createManualSearch(req, res) {
        const { SearchId } = req.body;
        const manualSearch = await ManualSearch.create({ id: uuid(), SearchId });
        return res.json(manualSearch);
    },

    async deleteManualSearch(req, res) {
        const { id } = req.body;
        const manualSearch = await ManualSearch.findByPk(id);
        if (!manualSearch) {
            return res.status(400).json({ error: 'Search not found' });
        }
        const remove = await manualSearch.destroy({ where: { id } });
        if (!remove) {
            return res.json({ message: 'Não foi possível remover' });
        }
        return res.json({ message: 'Removido com sucesso' });
    },
    
};