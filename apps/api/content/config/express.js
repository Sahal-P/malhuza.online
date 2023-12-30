const express = require('express');
const path = require('path');

const configureExpress = (app) => {
  // Set up view engine (assuming EJS)
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', 'public')));
};

module.exports = configureExpress;
