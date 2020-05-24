const faker = require("faker/locale/en");
const constants = require("../../lib/constants");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* return queryInterface.sequelize
      .query('SELECT * FROM "Study"')
      .then(([studies = results, metadata]) => {
       queryInterface.sequelize.query('SELECT * FROM "Researcher"')
        .then(([researchers = results, metadata]) => {
        // console.log(JSON.stringify(studies));
        // console.log(JSON.stringify(researchers));
        let selection = [];
        for (let index = 0; index < studies.length; index++) {
          const pos = index % 4;
          const s = {
            id: faker.random.uuid(),
            status: index % 10 === 0? "rejected":"accepted",
            StudyId: studies[index].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ResearcherId: researchers[pos].id
          };
          selection.push(s);
        }
        return queryInterface.bulkInsert("SelectionResult", selection);
        })
      });*/

    const studies = await queryInterface.sequelize
      .query('SELECT * FROM "Study"')
      .then(([results, metadata]) => { return results});
    const researchers = await queryInterface.sequelize
      .query('SELECT * FROM "Researcher"')
      .then(([results, metadata]) => { return results});
    let selection = [];
    for (let index = 0; index < studies.length; index++) {
      const pos = index % 4;
      const s = {
        id: faker.random.uuid(),
        status: index % 10 === 0 ? constants.selectionResultStatus.REJECTED : constants.selectionResultStatus.ACCEPTED,
        StudyId: studies[index].id,
        ResearcherId: researchers[pos].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      selection.push(s);
    }
    return queryInterface.bulkInsert("SelectionResult", selection);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SelectionResult", null, {});
  }
};
