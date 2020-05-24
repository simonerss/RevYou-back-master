const password = process.env.DATABASE_PASSWORD || '1234';
const username = process.env.DATABASE_USERNAME || 'postgres';
const database = process.env.DATABASE_NAME || 'revyou';
const host = process.env.DATABASE_HOST || '127.0.0.1';

module.exports = { 
  username: username,
  password: password,
  database: database,
  host: host,
  dialect: "postgres"
}

/*,
  "test": {
    "username": "root",
    "password": null, 
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}*/
