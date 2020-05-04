const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const path = require('path');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

// Connect to DB
const connectDB = require('./config/db');
connectDB();

//  Route files
const bugs = require('./routes/bugs.js');
const media = require('./routes/media.js');
const auth = require('./routes/auth.js');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bugs', bugs);
app.use('/api/v1/media', media);
app.use('/api/v1/auth', auth);

//
app.use(errorHandler);

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
