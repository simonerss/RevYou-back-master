'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdaptedQuery = sequelize.define('AdaptedQuery', {
    id: {type: DataTypes.STRING(50), primaryKey: true},
    query: DataTypes.TEXT,
    adaptedDate: DataTypes.DATE,
    importDate: DataTypes.DATE,
    search: DataTypes.INTEGER,
    // searchField: DataTypes.ENUM('Title', 'Abstract', 'Keywords', 'Full Text')
  }, {freezeTableName: true, schema: 'public'});
  
  AdaptedQuery.associate = function (models) {  
    
    models.AdaptedQuery.belongsTo(models.AutomaticSearch, {
      as: 'AutomaticSearch',
      foreignKey: {
        name: 'AutomaticSearchId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.AdaptedQuery.belongsTo(models.StandardQuery, {
      as: 'StandardQuery',
      foreignKey: {
        name: 'StandardQueryId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.AdaptedQuery.belongsTo(models.SearchEngine, {
      as: 'SearchEngine',
      foreignKey: {
        name: 'SearchEngineId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
  }

  return AdaptedQuery;
};