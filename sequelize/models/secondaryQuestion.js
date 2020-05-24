'use strict';
module.exports = (sequelize, DataTypes) => {
    const SecondaryQuestion = sequelize.define('SecondaryQuestion', {
      id: {type: DataTypes.STRING(50), primaryKey: true},
      description: DataTypes.TEXT
    }, {freezeTableName: true, schema: 'public'});

    SecondaryQuestion.associate = function(models){
      models.SecondaryQuestion.belongsTo(models.Project, {
        as: 'Project',
        foreignKey: {
          name: 'ProjectId',
          allowNull: false
        }, 
        foreignKeyConstraint:true
      });
    }

    return SecondaryQuestion;
};