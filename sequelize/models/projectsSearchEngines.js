'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectsSearchEngines = sequelize.define('ProjectsSearchEngines', {
        ProjectId: DataTypes.STRING,
        SearchEngineId: DataTypes.STRING,
    },
    { freezeTableName: true, schema: 'public' });

    return ProjectsSearchEngines;
};