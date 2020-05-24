'use strict';

module.exports = (sequelize, DataTypes) => {
  const Researcher = sequelize.define('Researcher', {
    id: { type: DataTypes.STRING(50), primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { freezeTableName: true, schema: 'public' });

  Researcher.associate = function (models) {

    models.Researcher.hasMany(models.ProjectResearcherSearchEngine, {
      as: 'Distribuition',
      foreignKey: {
        name: 'ResearcherId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Researcher.belongsToMany(models.Project, {
      as: 'Projects',
      through: 'ProjectsResearchers',
      foreignKey: 'ResearcherId',
    });

    models.Researcher.hasMany(models.Project, {
      as: 'Coordinator',
      foreignKey: {
        name: 'CoordinatorId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Researcher.hasMany(models.SelectionResult, {
      foreignKey: "ResearcherId",
      foreignKeyConstraint: true
    });

    models.Researcher.hasMany(models.Form, {
      foreignKey: "ResearcherId",
      foreignKeyConstraint: true
    });

    models.Researcher.belongsToMany(models.ExtractionStep, {
      through: 'ExtractionStepDecisor'
    });

  }

  return Researcher;
};