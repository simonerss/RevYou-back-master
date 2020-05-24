const { Op } = require('sequelize');
const { Search } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");


module.exports = {
    async getSearchs(req, res) {
        const searchs = await Search.findAll();
        return res.json({ searchs });
    },

    async createSearch(req, res) {
        const { executionDate, name, order, description, ProjectId } = req.body;
        const search = await Search.create({ id: uuid(), executionDate, name, order, description, ProjectId });
        return res.json(search);
    },

    async deleteSearch(req, res) {
        const { id } = req.body;
        const search = await Search.findByPk(id);
        if (!search) {
            return res.status(400).json({ error: 'Search not found' });
        }
        const remove = await Search.destroy({where: {id}});
        if(!remove){
            return res.json( { message: 'Não foi possível remover' } );
        }

        return res.json( { message: 'Removido com sucesso' } );
    },

};