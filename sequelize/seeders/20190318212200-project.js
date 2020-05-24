("use strict");
//npx sequelize db:seed:all
//npx sequelize db:seed:undo:all
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Project",
      [{
        id: "fe864360-dd2b-494d-8243-453fce514ba7",
        title: "Revisão sistemática sobre Procedimentos para Revisão e Mapeamento Sistemáticos",
        description: "Pesquisa com objetivo em identificar os procedimentos formalizados para a execução de revisões e mapeamento sistemáticos em engenharia de software.",
        objective:"Identificar os procedimentos formalizados para a execução de revisões e mapeamento sistemáticos em engenharia de software.",
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("Project", null, {});
  }
};
