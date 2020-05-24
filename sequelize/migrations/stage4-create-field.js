'use strict';
var uuid = require('uuid/v4');
var constants = require('../../lib/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Field", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      option: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.fieldTypes).map((key) => constants.fieldTypes[key])
      },
      position:{
        type: Sequelize.INTEGER, 
        defaultValue: 10
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Field");
  }
};
