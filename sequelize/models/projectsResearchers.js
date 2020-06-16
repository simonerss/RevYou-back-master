'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectsResearchers = sequelize.define('ProjectsResearchers', {
        ProjectId: DataTypes.STRING,
        ResearcherId: DataTypes.STRING,
    },
    { freezeTableName: true, schema: 'public' });

    return ProjectsResearchers;
};