const {SearchKeyword} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createSearchKeyword = async (req, res) => {
    try{
        const {keywords, ProjectId} = req.body;
        await keywords.forEach(async keyword => {
            await SearchKeyword.create({
                id: uuid(),
                keyword,
                ProjectId
            });
        });
        return res.status(200).json({message: 'Search Keyword Cadastrada'});
    }catch(err){
        return res.status(500).json({message: 'error interno', err});
    }
}

const getSearchKeyword = async (req, res) => {
    try {
        const {ProjectId} = req.params;
        const result = await SearchKeyword.findAll({where: {ProjectId}});
        if(result){
            return res.status(201).json(result);
        }else{
            return res.status(404).json({message: 'Search Keyword não existe'});
        }
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

const updateSearchKeyword = async (req, res) => {
    try {
        const {ProjectId} = req.params;
        const {ids, keywords} = req.body;
        await ids.forEach(async (item, index) =>{
            await SearchKeyword.update({
                keyword: keywords[index]
            });
        })
        await keywords.forEach(async (item, index) =>{
            if(index >= ids.length){
                await SearchKeyword.create({
                    id: uuid(),
                    keyword: keywords[index],
                    ProjectId
                });
            }
        })
        return res.status(200).json({message: 'alterado com sucesso'});
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

module.exports = {
    createSearchKeyword,
    getSearchKeyword,
    updateSearchKeyword
}