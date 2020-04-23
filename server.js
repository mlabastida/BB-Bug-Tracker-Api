const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

// Connect to DB
const connectDB = require('./config/db');
connectDB();

//  Route files
const bugs = require('./routes/bugs.js');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/bugs', bugs);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
