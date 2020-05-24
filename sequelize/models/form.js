'use strict';
var constants = require('../../lib/constants');
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    type: {
      type: DataTypes.ENUM,
      values: Object.keys(constants.formTypes).map((key) => constants.formTypes[key])
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.keys(constants.formStatus).map((key) => constants.formStatus[key])
    }
  },
    { freezeTableName: true, schema: 'public' }
  );

  Form.associate = function (models) {
    models.Form.hasMany(models.Answer, { 
      as: 'Answer',
      foreignKey: 'FormId', 
      foreignKeyConstraint: true 
    });
        
    models.Form.belongsTo(models.TemplateForm, {
      as: 'TemplateForm',
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
    
    models.Form.belongsTo(models.Study, {
      as: 'StudyOwner',
      onDelete: "CASCADE",
      foreignKey: 'id'
      /*foreignKey: {
        allowNull: true
      }*/
    });
    
    models.Form.belongsTo(models.Researcher, {
      as: 'Researcher',
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Form;
};