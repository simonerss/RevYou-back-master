[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# RevYou-BackEnd 

This repository is part of the Revyou project, a tool to support the collaborative and distributed development of systematic reviews.

Read this in other languages: [Português](README.pt.md)

### Folder Structure
```
### A typical top-level directory layout

.
├── node_modules            # All dependencies installed
├── config                  # Configuration of sequelize
├── sequelize               # Models e migrations of sequelize
├── src                     # Source files
├── .sequelizerc            # Setting up the path of the sequelize folders
├── index.js                # entry point of api 
├── package.json
├── README.pt.md 
└── README.md

```

```
### Src directory layout
src
├── researcher
│   └── researcherController.js
│   └── researcherRouter.js
│   └── researcherTest.js
├── study
└── project
```

### Tech

RevYou-back uses a number of open source projects to work properly:

* [NPM] - A package manager for the JavaScript programming language.
* [Express] - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
* [Sequelize] - Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* [Jest] - A library for testing JavaScript code, and it's an open source project maintained by Facebook.

### Installation

RevYou-back requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies, create all tables at the database and run the app.

```sh
$ git clone https://github.com/DCOMP-UFS/RevYou-back.git
$ cd RevYou-BackEnd
$ npm install
$ npx sequelize db:migrate
$ npx sequelize db:seed:all (optional seeder for some tables)
$ npm start
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the api in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to test on Postman or application of your choice.

The application is updated automatically if you make edits.<br>
You will also see any errors in the console.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


[node.js]: <http://nodejs.org>  
[NPM]: <https://www.npmjs.com/>
[Udacity Git Commit]: <https://udacity.github.io/git-styleguide/>
[Jest]: <https://jestjs.io/>
[Sequelize]: <http://docs.sequelizejs.com/>
[Express]: <https://expressjs.com/>