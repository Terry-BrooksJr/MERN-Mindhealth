const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router();
const port = 5500;
const handlebars = require('express-handlebars');
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const  nodemailer = require('nodemailer');

require('dotenv').config()


// const indexRouter = require('./routes/index');

const app = express();
const Form = require("./models/form");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', 
  handlebars.engine(
  {
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}));
app.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('main', { layout: 'index' });
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));           
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

app.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('main', { layout: 'index' });
});

app.get('/there', (req, res, next) => {
    console.log(req);
    res.send('There');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// Emailing FUunctonality
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '',
//     pass: 'Qu33nL@dy'
//   } 
// });

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
let requester 

// var mailOptions = {
//   from: 'terry.arthur@brooksjr.com',
//   to: requester,
//   subject: 'Sending Email using Node.js',
//   html: ''''''
// };
//Makes the app listen to port 5500
app.listen(port, () => console.log(`App listening to port ${port}`));

module.exports = app;
