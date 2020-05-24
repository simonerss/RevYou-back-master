[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# RevYou-BackEnd 

Este repositório faz parte do projeto Revyou, uma ferramenta para apoiar o desenvolvimento de revisões sistemáticas de maneira colaborativa e distribuída.

Acesse um dos links a seguir para ler em outros idiomas: [English](README.md)

### Estrutura de Pastas
```
### Layout típico de diretório top-level

.
├── node_modules            # Onde as dependências estão instaladas
├── config                  # Configuração do sequelize
├── sequelize               # Modelos e migrações do sequelize
├── src                     # Pasta Raiz
├── .sequelizerc            # Configuração do caminho das pastas do sequelize
├── index.js                # Ponto de entrada da api
├── package.json
├── README.pt.md 
└── README.md

```

```
### Layout do diretório src 

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

* [NPM] - É um gerenciador de pacotes para a linguagem de programação JavaScript.
* [Express] - O Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web e móvel. 
* [Sequelize] - O Sequelize é um ORM baseado em Promise para Node.js, e suporta os dialetos PostgreSQL, MySQL, MariaDB, SQLite e MSSQL e recursos a transação, relacionamentos, replicação de leitura e muito mais.
* [Jest] - É uma biblioteca para testar o código JavaScript, e é um projeto de código aberto mantido pelo Facebook.

### Instalação

RevYou-back requer o [Node.js](https://nodejs.org/) v8+ para ser executado.

Instale as dependências e execute o aplicativo da seguinte maneira:

```sh
$ git clone https://github.com/DCOMP-UFS/RevYou-back.git
$ cd RevYou-BackEnd
$ npm install
$ npm start
```

### Scripts Disponíveis

No diretório do projeto, você pode executar:

#### `npm start`

Executa a apu no modo de desenvolvimento.<br>
abra [http://localhost:5000](http://localhost:5000) para testar no Postman ou aplicativo de sua escolha.

O aplicativo é atualizado automaticamente se você fizer edições.<br>
Você irá ver os erros no console da aplicação.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


[node.js]: <http://nodejs.org>  
[NPM]: <https://www.npmjs.com/>
[Udacity Git Commit]: <https://udacity.github.io/git-styleguide/>
[Jest]: <https://jestjs.io/>
[Sequelize]: <http://docs.sequelizejs.com/>
[Express]: <https://expressjs.com/>
