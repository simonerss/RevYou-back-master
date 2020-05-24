'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    id: {type: DataTypes.STRING(50), primaryKey: true},
    studiesLanguage: DataTypes.STRING
  }, {freezeTableName: true});

  Language.associate = function(models){
    models.Language.belongsToMany(models.Project, {
      through: 'ProjectsLanguages'
    });
  }

  return Language;
};