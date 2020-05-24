'use strict';

module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    id: { type: DataTypes.STRING(50), primaryKey: true },
    executionDate: DataTypes.DATE,
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, { freezeTableName: true, schema: 'public' });

  Search.associate = function (models) {

    models.Search.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: {
        name: 'ProjectId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Search.hasMany(models.Study, {
      as: 'Studies',
      foreignKey: {
        name: 'SearchId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Search.hasMany(models.AutomaticSearch, {
      as: 'AutomaticSearch',
      foreignKey: {
        name: 'SearchId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });

    models.Search.hasMany(models.ManualSearch, {
      as: 'ManualSearch',
      foreignKey: {
        name: 'SearchId',
        allowNull: false
      },
      foreignKeyConstraint: true
    });
  }

  return Search;
};