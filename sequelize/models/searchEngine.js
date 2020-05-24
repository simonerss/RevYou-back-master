'use strict';
module.exports = (sequelize, DataTypes) => {
  const SearchEngine = sequelize.define('SearchEngine', {
    id: {type: DataTypes.STRING(50), primaryKey: true},
    name: DataTypes.STRING
  }, {freezeTableName: true});

  SearchEngine.associate = function(models){
    
    models.SearchEngine.belongsToMany(models.Project, {
      through: 'ProjectsSearchEngines'
    });

    models.SearchEngine.hasMany(models.ProjectResearcherSearchEngine, {
      as: 'Distribuition',
      foreignKey: {
        name: 'SearchEngineId',
        allowNull: false
      }, 
      foreignKeyConstraint:true
    });

    models.SearchEngine.hasMany(models.AdaptedQuery, {
      as: 'AdaptedQuery',
      foreignKey: {
        name: 'SearchEngineId',
        allowNull: false
      }, 
      foreignKeyConstraint:true
    });
  
  }

  return SearchEngine;
};