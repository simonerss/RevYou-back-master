const faker = require("faker/locale/pt_BR");
("use strict");
//npx sequelize db:seed:all
//npx sequelize db:seed:undo:all
module.exports = {
  up: (queryInterface, Sequelize) => {
    const articles = [
      "Beyond the spreadsheet- reflections on tool support for literature studies",
      "Three empirical studies on the agreement of reviewers about the quality of software engineering experiments",
      "Formalizing a systematic review updating process",
      "Outcomes of a community workshop to identify and rank barriers to the systematic literature review process",
      "Externalising tacit knowledge of the systematic review process",
      "Recommended steps for thematic synthesis in software engineering",
      "Vision for SLR tooling infrastructure: Prioritizing value-added requirements",
      "Lessons from applying the systematic literature review process within the software engineering domain",
      "A systematic review of systematic review process research in software engineering",
      "Strength of Evidence in Systematic Reviews in Software Engineering",
      "Improvements in the StArt tool to better support the systematic review process",
      "Guidelines for conducting systematic mapping studies in software engineering: An update",
      "Defining protocols of systematic literature reviews in software engineering: A survey",
      "Experience-based guidelines for effective and efficient data extraction in systematic reviews in software engineering",
      "Slrtool: A tool to support collaborative systematic literature reviews",
      "How reliable are systematic reviews in empirical software engineering?",
      "SLR-Tool a tool for performing systematic literature reviews",
      "Tools to support systematic reviews in software engineering: A cross-domain survey using semi-structured interviews",
      "An Empirical Investigation of Systematic Reviews in Software Engineering",
      "Quantitative Determination of the Relationship between Internal Validity and Bias in Software Engineering Experiments: Consequences for Systematic Literature Reviews",
      "A Visual Text Mining approach for Systematic Reviews"
    ];
    let studies = [];
    for (let index = 0; index < articles.length; index++) {
       const s = {
        id: faker.random.uuid(),
        title: articles[index],
        copyright: faker.company.companyName(),
        journal: faker.company.companyName(),
        author: faker.name.findName(),
        volume: faker.random.number(100),
        year: faker.random.number(20) + 2000,
        pages: faker.random.number(30).toString(),
        issnIsbn: faker.internet.ipv6(),
        address: faker.address.country(),
        abstract: faker.lorem.paragraph(),
        keywords: faker.lorem.words(4),
        url: faker.internet.url(),
        doi: faker.internet.mac(),
        citeKey: faker.lorem.words(2),
        createdAt: new Date(),
        updatedAt: new Date(),
        ProjectId: "fe864360-dd2b-494d-8243-453fce514ba7",
      };
      studies.push(s);
    }
    return queryInterface.bulkInsert("Study", studies);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("Study", null, {});
  }
};
