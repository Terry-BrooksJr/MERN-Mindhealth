const express = require('express');
const appointmentHandler = express.Router();
// const nodemailer = require('nodemailer');
const validator = require('validator');
const session = require('express-session');
const flash = require('connect-flash');
const { body, validationResult } = require('express-validator');
bodyParser = require('body-parser');


appointmentHandler.use(bodyParser.urlencoded({ extended: true }));
appointmentHandler.use(session({
  secret: 'PpoavJ0Dtkfw;hj524sX',
  resave: true,
  saveUninitialized: true
}));

appointmentHandler.use(flash());

appointmentHandler.post('/new',
  //Validate that the required fields are completed 
  body('inputFirstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
  body('inputLastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.'),
  body('inputContactNumber').isMobilePhone().trim().withMessage('Email must be specified.'),
  body('inputEmail').isEmail().trim().withMessage('Email must be specified.'),
  (req, res) => {
    errors = validationResult(req);

     if (!errors.isEmpty()) {
       res.render('/', { errors: errors.array() });
     }
});

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '',
//     pass: 'Qu33nL@dy'
//   } 
// });


let requester

// var mailOptions = {
//   from: 'terry.arthur@brooksjr.com',
//   to: requester,
//   subject: 'Sending Email using Node.js',
//   html: " "
// };


// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
module.exports = appointmentHandler;