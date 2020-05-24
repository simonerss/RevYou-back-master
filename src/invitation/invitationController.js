const { Invitation, Researcher, Project } = require('../../sequelize/models/index');
const uuid = require("uuid/v4");
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

const createInvitation = async (req, res) => {
    try {
        const { email, ProjectId } = req.body;
        const researcher = await Researcher.findOne({ where: { email: email } });
        await Invitation.create({
            id: uuid(),
            email,
            situation: 'pending',
            ProjectId
        })
        let mailOptions;
        if (!!researcher) {
            /*mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: `Hello! Antonio Neto invited you to participate in a project at RevYou`,
                text: `I'm working on this project at RevYou and I want you to participate!`
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });*/
        } else {
            /*mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: `Hello! Antonio Neto invited you to participate in a project at RevYou`,
                text: `I'm working on this project at RevYou and I want you to participate! You don't know RevYou?
                RevYou Revyou is an open source tool that facilitates support automated to collaborative process of systematic review and mapping.`
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });*/
        }
        return res.status(201).json('criado');

    } catch (err) {
        return res.status(500).json({ message: 'error interno' });
    }
}

const getListInvitations = async (req, res) => {
    const invitations = await Invitation.findAll();
    return res.json(invitations);
}

const getListInvitationsUser = async (req, res) => {
    const { email } = req.body;
    const invitations = await Invitation.findAll({
        attributes: ['id', 'situation'],
        where: { email: email },
        include: {
            association: 'Project',
            attributes: ['id', 'title'],
        }
    });

    return res.json(invitations);
}

const getListInvitationsUserFilter = async (req, res) => {
    const { email, datainicio, datafinal } = req.body;
    const invitations = await Invitation.findAll({
        attributes: ['id', 'situation'],
        where: {
            email: email,
            createdAt:  { 
                [Op.or]: { 
                    [Op.lt]: datainicio, 
                    [Op.gt]: datafinal 
                } 
            },
        },
        include: {
            association: 'Project',
            attributes: ['id', 'title'],
        }
    });

    return res.json(invitations);
}



const deleteInvitation = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Invitation.destroy({ where: { id } });
        if (!!result) {
            return res.status(200).json({ message: "deletado com sucesso" });
        } else {
            return res.status(404).json({ message: 'projeto inexistete' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'error interno', error });
    }
}

const updateSituation = async (req, res) => {
    try {
        const { id } = req.params;
        const { situation } = req.body;
        const result = await Invitation.update({ situation }, { where: { id } });
        if (result) {
            return res.status(200).json({ message: "convite atulizado" });
        } else {
            return res.status(404).json({ message: "convite inexistete" });
        }
    } catch (error) {
        return res.status(500).json({ message: "error interno", error });
    }
}

const getInvitationAccept = async (req, res) => {
    try {
        const { ProjectId } = req.params;
        const project = await Project.findByPk(ProjectId);
        const result = await project.getResearcher({ attributes: ['name'] });

        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).json({ message: 'error interno', err });
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

module.exports = {
    getListInvitationsUserFilter,
    getListInvitationsUser,
    createInvitation,
    deleteInvitation,
    updateSituation,
    getInvitationAccept,
    getListInvitations
}