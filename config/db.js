/*
const { Client } = require('pg');
var client = new Client(process.env.POSTGRES_URI);

const connectDBs = async () => {
  const conn = await client.connect();
  console.log(`PostgreSQL Connected: ${client.host}`.cyan.underline.bold);
};
*/

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

// const connectDB = require('knex')({
//   client: 'pg',
//   connection: process.env.POSTGRES_URI,
//   searchPath: ['knex', 'public'],
// });

module.exports = connectDB;
