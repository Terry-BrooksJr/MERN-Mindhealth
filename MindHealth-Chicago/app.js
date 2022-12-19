const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router();
const port = 5500;
const handlebars = require('express-handlebars');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
const compression = require("compression");


// Utility and Misc Middleware
dotenvExpand.expand(myEnv) // Load environment variables from .env file
app.use(express.static(__dirname + '/public')); //Serves resources from public folder
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies
app.use(compression()); //Compress all routes


//Route Initialization
const primaryRouter = require('./routes/index');
const editorRouter = require('./routes/editor');

//Route Registration
app.use('/', primaryRouter);
app.use('/editor', editorRouter);


//CORS and Header middleware
const cors = require('cors');
app.use(cors());
const helmet = require("helmet");
app.use(helmet());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', 
  handlebars.engine(
  {
    extname: 'handlebars',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
}));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Error Handling and Logging
app.use(logger('dev'));
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  // render the error page
  res.status(err.status || 500);
  res.render('404-page');
});


//Makes the app listen to port 5500
app.listen(port, () => console.log(`App listening to port ${port}`));

module.exports = app;
