import path from 'path'
import express from 'express'

const configureExpress = (app) => {
  // Set up view engine (assuming EJS)
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', 'public')));
};

export default configureExpress;
