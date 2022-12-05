const express = require('express');
const appointmentHandler = express.Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: 'Qu33nL@dy'
  } 
});

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
let requester

var mailOptions = {
  from: 'terry.arthur@brooksjr.com',
  to: requester,
  subject: 'Sending Email using Node.js',
  html: ''''''
};

module.exports = appointmentHandler;