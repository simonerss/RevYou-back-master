'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectResearcherSearchEngine = sequelize.define('ProjectResearcherSearchEngine', {
        id: { type: DataTypes.STRING(50), primaryKey: true },
    }, { freezeTableName: true, schema: 'public' });

    ProjectResearcherSearchEngine.associate = function (models) {

        models.ProjectResearcherSearchEngine.belongsTo(models.Project, {
            as: 'Project',
            foreignKey: {
                name: 'ProjectId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });

        models.ProjectResearcherSearchEngine.belongsTo(models.Researcher, {
            as: 'Researcher',
            foreignKey: {
                name: 'ResearcherId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });

        models.ProjectResearcherSearchEngine.belongsTo(models.SearchEngine, {
            as: 'SearchEngine',
            foreignKey: {
                name: 'SearchEngineId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });
        
    }

    return ProjectResearcherSearchEngine;
};