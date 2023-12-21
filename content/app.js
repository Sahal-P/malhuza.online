// app.js

const express = require('express');
const connectToDatabase = require('./config/database');
const configureExpress = require('./config/express');
const morgan = require('morgan');
const cors = require('cors');


// Load environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();

// Use Morgan for request logging

// Connect to MongoDB
connectToDatabase();

// Configure Express app
configureExpress(app);

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan('combined'));

// Routes
const indexRouter = require('./routes/index');

// Use main router
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
