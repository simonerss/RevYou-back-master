'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProjectsLanguages = sequelize.define('ProjectsLanguages', {
        ProjectId: DataTypes.STRING,
        LanguageId: DataTypes.STRING,
    },
    { freezeTableName: true, schema: 'public' });

    return ProjectsLanguages;
};