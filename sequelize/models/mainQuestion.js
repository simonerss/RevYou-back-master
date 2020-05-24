'use strict';
module.exports = (sequelize, DataTypes) => {
    const MainQuestion = sequelize.define('MainQuestion', {
      id: {type: DataTypes.STRING(50), primaryKey: true},
      description: DataTypes.TEXT,
      population: DataTypes.TEXT,
      intervation: DataTypes.TEXT,
      control: DataTypes.TEXT,
      results: DataTypes.TEXT,
      context: DataTypes.TEXT,
      design: DataTypes.TEXT
    }, {freezeTableName: true, schema: 'public'});

    MainQuestion.associate = function(models){
      models.MainQuestion.belongsTo(models.Project, {
        as: 'MainQuestion',
        foreignKey: {
          name: 'ProjectId',
          allowNull: false
        }, 
        foreignKeyConstraint:true
      });
    }

    return MainQuestion;
};