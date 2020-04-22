const { Client } = require('pg');

var client = new Client(process.env.POSTGRES_URI);

const connectDB = async () => {
  const conn = await client.connect();
  console.log(`PostgreSQL Connected: ${client.host}`);
};

module.exports = connectDB;
