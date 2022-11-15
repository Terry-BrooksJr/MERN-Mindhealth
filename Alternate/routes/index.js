var express = require('express');
var primaryRouter = express.Router();


/* GET home page. */
primaryRouter.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('main', { layout: 'index' });
});


module.exports = primaryRouter;
