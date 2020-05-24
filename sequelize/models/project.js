'use strict';

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.STRING(50), primaryKey: true },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    objective: DataTypes.TEXT,
    reviewType: DataTypes.ENUM('Systematic Review', 'Systematic Mapping', 'Not Systematic')
  }, { freezeTableName: true, schema: 'public' });

  Project.associate = function (models) {

    models.Project.hasMany(models.ProjectResearcherSearchEngine, {
      as: 'DistribuitionSearchEngine',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Project.belongsTo(models.Researcher, {
      as: 'ProjectCoordinator',
      foreignKey: {
        name: 'CoordinatorId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Project.belongsToMany(models.Researcher, {
      as: 'Researchers',
      through: 'ProjectsResearchers',
      foreignKey: 'ProjectId',
      onDelete: "cascade"
    });

    models.Project.hasMany(models.Invitation, {
      as: 'Inviteds',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Project.hasOne(models.MainQuestion, {
      as: 'MainQuestion',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Project.hasMany(models.SecondaryQuestion, {
      as: 'SecondaryQuestion',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
    
    models.Project.hasOne(models.StandardQuery, {
      as: 'StandardQuery',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
    
    models.Project.hasMany(models.SearchKeyword, {
      as: 'SearchKeyword',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
    
    models.Project.hasMany(models.SelectionCriteria, {
      as: 'SelectionCriteria',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
    
    models.Project.hasMany(models.Study, {
      as: 'Study',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
    
    models.Project.hasMany(models.AdaptedQuery, {
      as: 'AdaptedQuery',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
    
    models.Project.hasMany(models.ExtractionStep, {
      as: 'ExtractionSteps', 
      foreignKey: 'ProjectId', 
      foreignKeyConstraint: true 
    });

    models.Project.hasMany(models.SelectionStep, {
      as: 'SelectionSteps', 
      foreignKey: 'ProjectId', 
      foreignKeyConstraint: true 
    });
    
    //* - *
    models.Project.belongsToMany(models.Language, {
      as: 'Languagues',
      through: 'ProjectsLanguages',
      onDelete: "cascade"
    });
    
    models.Project.belongsToMany(models.SearchEngine, {
      as: 'SearchEngines',
      through: 'ProjectsSearchEngines',
      onDelete: "cascade"
    });
  
  }

  return Project;
};