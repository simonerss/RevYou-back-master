const {StandardQuery} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createStandardQuery = (req, res) => {
    try{
        const {query, ProjectId} = req.body;
        StandardQuery.findOrCreate({where: {ProjectId}, defaults: {
            id : uuid(),
            query,
            ProjectId
        }})
        .spread((mainQuestion, created) => {
            mainQuestion.get({
                plain: true
            });
            if(created === true){
                return res.status(201).send('Standard Query cadastrada com sucesso');
            }else{
                return res.status(401).send('Standard Query ja cadastrado');
            }
        });
    }catch(err){
        return res.status(500).json({message: 'error interno', err}); 
    }
}

const getStandardQuery = async (req, res) => {
    try{
        const {ProjectId} = req.params;
        const result = await StandardQuery.findOne({where: {ProjectId}});
        if(result){
            return res.status(201).json(result);
        }else{
            return res.status(401).json({message: 'Standard Query não existe'});
        }
    }catch(err){
        return res.status(500).json({message: 'error interno', err}); 
    }
}

const updateStandardQuery = async (req, res) => {
    try{
        const {id} = req.params;
        const {query} = req.body;
        const result = await StandardQuery.update({
            query
        },
        {where: {id}});
        if(result) {
            return res.status(200).json({message: "Standard Query atulizado"});
        }else{
            return res.status(404).json({message: 'error'});
        }
    }catch(err){
        return res.status(500).send('error');
    }
}

module.exports = {
    createStandardQuery,
    getStandardQuery,
    updateStandardQuery
}