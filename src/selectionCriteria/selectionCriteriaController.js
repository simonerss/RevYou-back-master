const {SelectionCriteria} = require('../../sequelize/models/index');
const uuid = require("uuid/v4");

const createSelectionCriteria = async (req, res) => {
    try {
        const {description, type, ProjectId} = req.body;
        await SelectionCriteria.create({
            id: uuid(),
            description,
            type,
            ProjectId
        });
        return res.status(200).json({message: 'Selection Criteria Cadastrada'});
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

const getSelectionCriteria = async (req, res) => {
    try {
        const {ProjectId} = req.params;
        const result = await SelectionCriteria.findAll({where: {ProjectId}});
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

const deleteSelectionCriteria = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await SelectionCriteria.destroy({where: {id}});
        if(!!result){
            return res.status(200).json({message: "deletado com sucesso"});
        }else{
            return res.status(404).json({message: 'projeto inexistete'});
        }
    } catch (err) {
        return res.status(500).json({message: 'error interno', err});
    }
}

module.exports = {
    createSelectionCriteria,
    getSelectionCriteria,
    deleteSelectionCriteria
}