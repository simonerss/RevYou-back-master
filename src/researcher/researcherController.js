const { Researcher, Project } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const { Op } = require('sequelize');

const createResearcher = (req, res) => {
    try {
        const { name, email, password } = req.body;

        Researcher.findOrCreate({
            where: { email: email }, defaults: {
                id: uuid(),
                name,
                password
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
        return res.status(500).send('error');
    }
}

const getResearcher = async (req, res) => {
    try {
        const { email } = req.params;
        const researcher = await Researcher.findOne({ 
            where: { email: email },
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });

        if (researcher) {
            return res.status(202).json(researcher);
        } else {
            return res.status(404).json({ message: 'usuario inexistente' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'error', err });
    }
}

const getResearcherById = async (req, res) => {
    try {
        const id = req.params.researcherid;
        const researcher = await Researcher.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'email']
        });

        if (researcher) {
            return res.status(202).json(researcher);
        } else {
            return res.status(404).json({ message: 'usuario inexistente' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'error', err, id: id });
    }
}

const updateResearcher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (name) {
            await Researcher.update({ name }, { where: { id } });
            return res.status(201).send('researcher alterado com sucesso');
        }
        else if (password) {
            await Researcher.update({ password }, { where: { id } });
            return res.status(201).send('researcher alterado com sucesso');
        } else {
            const researcher = await Researcher.findOne({ where: { email } });
            if (researcher) {
                return res.status(400).send('email ja cadastrado');
            } else {
                await Researcher.update({ email }, { where: { id } });
                return res.status(201).send('researcher alterado com sucesso');
            }
        }

    } catch (err) {
        return res.status(500).send(err);
    }
}

const deleteResearcher = async (req, res) => {
    try {
        const { email } = req.params;
        const researcher = await Researcher.findOne({ where: { email: email } });
        if (researcher) {
            Researcher.destroy({ where: { email: email } });
            return res.status(200).send('usuario deletado com sucesso');
        } else {
            return res.status(404).send('researcher não existe');
        }

    } catch (err) {
        return res.status(500).send('error');
    }
}

const getProjectsResearcher = async (req, res) => {
    try {
        const { email } = req.params;
        const researcher = await Researcher.findOne({ where: { email: email } });
        const projects = await researcher.getProjects({
            attributes: ['CoordinatorId', 'title']
        }).then(async (res) => {
            const projects2 = await researcher.getCoordinator({ attributes: ['id', 'CoordinatorId', 'title'] });
            res = await res.concat(projects2);
            return res;
        });
        return res.status(200).send(projects);
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

const getProjectsResearcher_ = async (req, res) => {
    try {
        const { email } = req.params;
        const researcher = await Researcher.findOne({ where: { email }, attributes: ['id'] });
        const ResearcherId = researcher.id;
        const projects = await Project.findAll({
            attributes: ['id', 'title', 'reviewType'],
            include: [{
                association: 'ProjectCoordinator',
                where: { email },
                attributes: ['id', 'name', 'email'],
                require: false
            }],
        }).then(async (res) => {
            const projects2 = await Project.findAll({
                attributes: ['id', 'title', 'reviewType'],
                include: [{
                    association: 'ProjectCoordinator',
                    attributes: ['id', 'name', 'email'],
                },{
                    association: 'Researchers',
                    where: { email: email },
                    attributes: ['id', 'name', 'email'],
                    require: false
                }]
            });
            res = await res.concat(projects2);
            return res;
        });
        return res.status(200).send(projects);
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }


    // {
    //     association: 'Researchers',
    //     attributes: ['name', 'email'],
    //     where: { email },
    //     through: { attributes: [] },
    //     require: false
    // }
}

module.exports = {
    createResearcher,
    getResearcher,
    getResearcherById,
    updateResearcher,
    deleteResearcher,
    getProjectsResearcher,
    getProjectsResearcher_,
}