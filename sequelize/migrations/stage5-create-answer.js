'use strict';
var constants = require('../../lib/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Answer", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      supportData: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      option: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.answerStatus).map((key) => constants.answerStatus[key])
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
    return queryInterface.dropTable("Answer");
  }
};
