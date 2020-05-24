const {MainQuestion} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createMainQuestion = (req, res) => {
    try{
        const {description, population, intervation, control, results, context, design, ProjectId} = req.body;
        
        MainQuestion.findOrCreate({where: {ProjectId}, defaults: {
            id : uuid(),
            description,
            population,
            intervation,
            control,
            results,
            context,
            design,
            ProjectId 
        }})
        .spread((mainQuestion, created) => {
            mainQuestion.get({
                plain: true
            });
            if(created === true){
                return res.status(201).send('Main Question cadastrada com sucesso');
            }else{
                return res.status(401).send('Main Question ja cadastrado');
            }
        });
    }catch (err){
        return res.status(500).send('error');
    }
}

const getMainQuestion = async (req, res) => {
    try{
        const {ProjectId} = req.params;
        const result = await MainQuestion.findOne({where: {ProjectId}});

        if(result){
            return res.status(201).json(result);
        }else{
            return res.status(401).json({message: 'Main Question não existe'});
        }
    }catch(err){
        return res.status(500).send('error');
    }
}

const updateMainQuestion = async (req, res) =>{
    try{
        const {id} = req.params;
        const {description, population, intervation, control, results, context, design} = req.body;
        const result = await MainQuestion.update({
            description,
            population,
            intervation,
            control,
            results,
            context,
            design
        },
        {where: {id}});
        if(result) {
            return res.status(200).json({message: "Main Question atulizado"});
        }else{
            return res.status(404).json({message: 'error'});
        }
    }catch(err){
        return res.status(500).send('error');
    }
}

module.exports = {
    createMainQuestion,
    getMainQuestion,
    updateMainQuestion
}