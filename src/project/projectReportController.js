const { Op, sequelize } = require('sequelize');
const { Project, MainQuestion, StandardQuery } = require('../../sequelize/models/index');
const { QueryTypes } = require('sequelize');

module.exports = {

  async show(req, res) {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      attributes: ['id', 'title', 'description', 'objective', 'reviewType'],
      include: [{
        association: 'ProjectCoordinator',
        attributes: ['id', 'name', 'email']
      }, {
        association: 'Researchers',
        attributes: ['id', 'name', 'email']
      }, {
        association: 'Inviteds',
        attributes: ['id', 'situation', 'email', 'createdAt', 'updatedAt'],
      }, 
      {
        association: 'MainQuestion',
        attributes: ['id', 'description', 'population', 'intervation', 'control', 'results', 'context', 'design'],
      }, 
      {
        association: 'SecondaryQuestion',
        attributes: ['id', 'description']
      }, {
        association: 'StandardQuery',
        attributes: ['id', 'query']
      }, {
        association: 'SearchKeyword',
        attributes: ['id', 'keyword']
      }, {
        association: 'SelectionCriteria',
        attributes: ['id', 'description', 'type']
      }, {
        association: 'Study',
        attributes: ['id', 'title']
      }, {
        association: 'AdaptedQuery',
        attributes: ['id', 'query', 'adaptedDate', 'importDate']
      }, {
        association: 'SelectionSteps',
        attributes: ['id', 'startDate', 'endDate', 'dateChecker', 'dateConflicts', 'method', 'status', 'ratedContent', 'numCheckerStudy', 'scoreBoard']
      }, {
        association: 'Languagues',
        attributes: ['id', 'studiesLanguage']
      }, {
        association: 'SearchEngines',
        attributes: ['id', 'name']
      }
      ]
    });

    if (project == []) {
      return res.status(400).json({ message: 'Nenhum projeto encontrado.' });
    }

    return res.status(200).json(project);
  },

  async getMainQuestion(req, res) {
    const id = req.params.projectid;
    const mainQuestion = await MainQuestion.findOne({
      where: { ProjectId: id },
      attributes: ['id', 'description', 'population', 'intervation', 'control', 'results', 'context', 'design']
    });

    if (!mainQuestion) {
      return res.status(200).json({
        mainQuestion: {
          id: null,
          description: null,
          population: null,
          intervation: null,
          control: null,
          results: null,
          context: null,
          design: null
        }
      });
    }

    return res.status(200).json(mainQuestion);
  },

  async getStandardQuery(req, res) {
    const id = req.params.projectid;
    const standardQuery = await StandardQuery.findOne({
      where: { ProjectId: id },
      attributes: ['id', 'query'],
    });

    if (!standardQuery) {
      return res.status(200).json({
        standardQuery: {
          id: null,
          query: null,
        }
      });
    }

    return res.status(200).json(standardQuery);
  },

  async filters(req, res) {
    const { title, reviewType, coordinatorName, researcherName } = req.params;

    const projects = await Project.findAll({
      attributes: ['title', 'description', 'reviewType'],
      where: {
        title: { [Op.iLike]: `%${title}%` },
        reviewType: reviewType,
      },
      include: [{
        association: 'ProjectCoordinator',
        where: { name: { [Op.iLike]: `%${coordinatorName}%` } },
        attributes: ['name', 'email'],
        //required: false,
      }, {
        association: 'Researchers',
        where: { name: { [Op.iLike]: `%${researcherName}%` } },
        attributes: ['name', 'email'],
        required: false,
      }]
    });

    if (projects == []) {
      return res.status(400).json({ message: 'Nenhum projeto encontrado.' });
    }

    return res.status(200).json({ projects });

  },

  async searchProject(req, res) {
    const strquery = 'SELECT "Project"."id", "Project"."title", "Project"."objective", "Project"."description", "Project"."reviewType", ' +
      '"Researcher"."name" as "coordinatorName", "Researcher"."email"as "coordinatorEmail" FROM "Project" INNER JOIN "Researcher" ON "Project"."CoordinatorId" = "Researcher"."id";';
    const projects = await Project.sequelize.query(strquery, { type: QueryTypes.SELECT });
    return res.status(200).json(projects);
  },

  async aboutProject(req, res) {

    const ProjectId = req.params.projectid;
    const project = await Project.findByPk(ProjectId, {
      attributes: ['id', 'title', 'description', 'objective', 'reviewType'],
      include: [{
        association: 'ProjectCoordinator',
        attributes: ['id', 'name', 'email']
      }, {
        association: 'Researchers',
        attributes: ['id', 'name', 'email']
      }]
    });

    return res.status(200).json(project);
  },

  async showy(req, res) {
    return res.status(200).json({ message: "Callback obrigatório!" });
  },
};