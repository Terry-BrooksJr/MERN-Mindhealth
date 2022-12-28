const express = require('express');
const app = require('../app');
const editorRouter = express.Router();

editorRouter.get('/editor', (req, res, next) => {
  res.render('editor', { layout: 'editor_layout' });
});


module.exports = editorRouter;
