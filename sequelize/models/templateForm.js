'use strict';
module.exports = (sequelize, DataTypes) => {
    const TemplateForm = sequelize.define('TemplateForm', {
    },
        { freezeTableName: true, schema: 'public' }
    );

    TemplateForm.associate = function (models) {
        models.TemplateForm.belongsTo(models.ExtractionStep, {
            as: 'ExtractionStep',
            foreignKey: 'ExtractionStepId',
            foreignKeyConstraint: true
        });

        models.TemplateForm.hasMany(models.Field, {
            as: 'Field',
            foreignKey: 'TemplateFormId',
            foreignKeyConstraint: true
        });

        models.TemplateForm.hasMany(models.Form, {
            as: 'Form',
            foreignKey: 'TemplateFormId',
            foreignKeyConstraint: true
        });
    };

    return TemplateForm;
};