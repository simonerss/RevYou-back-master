"use strict";
var uuid = require('uuid/v4');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("TemplateForm", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("TemplateForm");
  }
};
