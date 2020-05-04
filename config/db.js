const config = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/test_db',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/test',
    },
  },
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_DEV_URI,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/development',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/production',
    },
  },
};

const connectDB = require('knex')(config.development);

module.exports = connectDB;
