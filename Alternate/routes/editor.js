const express = require('express');
const app = require('../app');
const editorRouter = express.Router();


editorRouter.get('/login', (req, res, next) => {
  res.render('login', { layout: 'login_layout' });
});

module.exports = editorRouter;
