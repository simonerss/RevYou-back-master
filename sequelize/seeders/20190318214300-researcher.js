const faker = require("faker/locale/en");
("use strict");
//npx sequelize db:seed:all
//npx sequelize db:seed:undo:all
module.exports = {
  up: (queryInterface, Sequelize) => {
    const names = [
      "Igor Vasconcelos Costa",
      "Edmo Felipe Ferreira Ramos dos Santos",
      "Simone Ris Santos Silva",
      "Antônio Bispo de Jesus Neto",
      "Debora Maria Coelho Nascimento",
      "Gilton José Ferreira da Silva"
    ];
    const emails = [
      "igorvc@dcomp.ufs.br",
      "edmo.santos@dcomp.ufs.br",
      "simonerss@dcomp.ufs.br",
      "antoniobjn@dcomp.ufs.br",
      "deboramcn@dcomp.ufs.br",
      "gilton@dcomp.ufs.br"
    ];
    let researchers = [];
    for (let index = 0; index < names.length; index++) {
      const r = {
        id: faker.random.uuid(),
        name: names[index],
        email: emails[index],
        password: "revyou",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProjectId: "fe864360-dd2b-494d-8243-453fce514ba7"
      };
      researchers.push(r);
    }
    return queryInterface.bulkInsert("Researcher", researchers);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Researcher", null, {});
  }
};
