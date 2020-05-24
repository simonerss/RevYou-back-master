'use strict';

module.exports = (sequelize, DataTypes) => {
    const Invitation = sequelize.define('Invitation', {
      id: {type: DataTypes.STRING(50), primaryKey: true},
      email: DataTypes.STRING,
      situation: DataTypes.ENUM('accept', 'denied', 'pending')
    }, {freezeTableName: true, schema: 'public'});
    
    Invitation.associate = function (models) {

      models.Invitation.belongsTo(models.Project, {
        as: 'Project',
        foreignKey: {
          name: 'ProjectId',
          allowNull: false
        },
        foreignKeyConstraint: true
      });
      
    }

    return Invitation;
};