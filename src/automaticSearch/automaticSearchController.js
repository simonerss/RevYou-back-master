const { Op } = require('sequelize');
const {AutomaticSearch} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");


module.exports = {
    async getAutomaticSearch(req, res){
        const automaticSearchs = await AutomaticSearch.findAll();
        return res.json({ automaticSearchs });
    },

    async createAutomaticSearch(req, res) {
        const { method, searchField, SearchId } = req.body;
        const automaticSearch = await AutomaticSearch.create({ 
            id: uuid(), 
            method, 
            searchField, 
            SearchId 
        });
        return res.json(automaticSearch);
    },

    async deleteAutomaticSearch(req, res) {
        const { id } = req.body;
        const automaticSearch = await AutomaticSearch.findByPk(id);
        if (!automaticSearch) {
            return res.status(400).json({ error: 'Search not found' });
        }
        const remove = await AutomaticSearch.destroy({where: {id}});
        if(!remove){
            return res.json( { message: 'Não foi possível remover' } );
        }
        return res.json( { message: 'Removido com sucesso' } );
    },

    async isManualSearch(itemStudyList) {
        const isManualSearch = await ManualSearch.findAll({
            //testar se SearchId do estudo e do ManualSearh são iguais
            where: {
                include: [
                    {
                        association: 'Search',
                        where: { SearchId: itemStudyList.SearchId }
                    },
                ]
            }
        });

        if (isManualSearch) {
            return true;
        } else {
            return false;
        }

    },

    async manualSearchAmount(req, res) {
        const { ProjectId } = req.body;
        let amount = 0;
        const listSearchidStudies = await Study.findAll({
            where: { ProjectId: ProjectId }, attributes: ['id', 'SearchId']
        });

        for (var prop in listSearchidStudies) {
            const isManualSearch = ManualSearch.findAll({
                where: { SearchId: listSearchidStudies[prop].SearchId }
            });
            if (isManualSearch) {
                amount++;
            }
        };
        return res.json({ listSearchidStudies, amount });
    },
};