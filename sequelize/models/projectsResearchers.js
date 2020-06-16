'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectsResearchers = sequelize.define('ProjectsResearchers', { },
    { freezeTableName: true, schema: 'public' });

    ProjectsResearchers.associate = function (models) {

        models.Project.belongsTo(models.Project, {
            as: 'Project',
            foreignKey: {
                name: 'ProjectId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });

        models.Researcher.belongsTo(models.Researcher, {
            as: 'Researcher',
            foreignKey: {
                name: 'ResearcherId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });
    }

    return ProjectsResearchers;
};