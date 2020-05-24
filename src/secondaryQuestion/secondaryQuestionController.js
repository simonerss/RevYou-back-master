const {SecondaryQuestion} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createSecondaryQuestion = async (req, res) => {
    try{
        const {descriptions, ProjectId} = req.body;
        
        const result = descriptions.map( async description => {
            return await SecondaryQuestion.create({
                id: uuid(),
                description,
                ProjectId
            });
        })
            
        await Promise.all(result)
        return res.status(200).json({message: 'Secondary Question Cadastrada'});
    }catch(err){
        return res.status(500).json({message: 'error interno', err});
    }
}

const getSecondaryQuestion = async (req, res) => {
    try{
        const {ProjectId} = req.params;
        const result = await SecondaryQuestion.findAll({where: {ProjectId}});

        if(result){
            return res.status(201).json(result);
        }else{
            return res.status(404).json({message: 'Secondary Question não existe'});
        }
    }catch(err){
        return res.status(500).json({message: 'error interno', err});
    }
}

const updateSecondaryQuestion = async (req, res) => {
    try{
        const {descriptions, ids} = req.body;

        const result = descriptions.map(async (description, index) => {
            return await SecondaryQuestion.update({description},{where: {id: ids[index]}}); 
        })
        
        Promise.all(result);

        return res.status(200).json({message: 'sucesss'});
    }catch(err){
        return res.status(500).json({message: 'error interno', err});
    }
}

const deleteSecondaryQuestion = async (req, res) => {
    try{
        const {ids} = req.query;
        
        const result = ids.map(async id => {
            return await SecondaryQuestion.destroy({where: {id}});
        })

        Promise.all(result);
        
        return res.status(200).json({message: 'sucesss'});
    }catch(err){
        return res.status(500).json({message: 'error interno', err});
    }
}

module.exports = {
    createSecondaryQuestion,
    getSecondaryQuestion,
    updateSecondaryQuestion,
    deleteSecondaryQuestion
}