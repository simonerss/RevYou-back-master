'use strict';
module.exports = (sequelize, DataTypes) => {
    const StandardQuery = sequelize.define('StandardQuery', {
      id: {type: DataTypes.STRING(50), primaryKey: true},
      query: DataTypes.TEXT
    }, {freezeTableName: true, schema: 'public'});

    StandardQuery.associate = function(models){
      models.StandardQuery.belongsTo(models.Project, {
        as: 'StandardQuery',
        foreignKey: {
          name: 'ProjectId',
          allowNull: false
        }, 
        foreignKeyConstraint:true
      });

      models.StandardQuery.hasMany(models.AdaptedQuery, {
        as: 'AdaptedQuery',
        foreignKey: {
          name: 'StandardQueryId',
          allowNull: false
        }, 
        foreignKeyConstraint:true
      });
    }

    return StandardQuery;
};