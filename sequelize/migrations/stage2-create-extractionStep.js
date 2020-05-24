'use strict';
var uuid = require('uuid/v4');
var constants = require('../../lib/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ExtractionStep', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateExtractor: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateConflicts: {
        allowNull: false,
        type: Sequelize.DATE
      },
      method: {
        allowNull: false,  
        type: Sequelize.ENUM,
        values: Object.keys(constants.stepMethods).map((key) => constants.stepMethods[key])},    
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.stepStatus).map((key) => constants.stepStatus[key])
      },
      numExtractorStudy: {
        type: Sequelize.INTEGER
      },
      scoreBoard: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('ExtractionStep');
  }
};
