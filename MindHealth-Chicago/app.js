const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router();
const port = 7701;
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();
const compression = require("compression");
const SidekickDebugger = require("@runsidekick/sidekick-agent-nodejs");
const { log } = require("console");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "handlebars",
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts",
  })
);

//CORS and Header middleware
const cors = require("cors");
app.use(cors());
const helmet = require("helmet");
app.use(helmet());
//TODO: Fiddle with this to get it to work
helmet.contentSecurityPolicy({
  directives: {
    "default-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "script-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "script-src-elem": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "script-src-attr": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "style-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "style-src-elem": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "style-src-attr": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "img-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "font-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "connect-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "media-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"],
    "object-src": ["'self'", "https://fonts.googleapis.com/*",
      "https://cdnjs.cloudflare.com/*", "https://source.unsplash.com/*", "https://fonts.gstatic.com/*"]
  }
});


SidekickDebugger.start({
  apiKey: process.env.SIDEKICK_API_KEY,
});
log(process.env.SIDEKICK_API_KEY);

// Utility and Misc Middleware
dotenvExpand.expand(myEnv); // Load environment variables from .env file
app.use(express.static(__dirname + "/public")); //Serves resources from public folder
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies
app.use(compression()); //Compress all routes

//  Route Initialization
const primaryRouter = require("./routes/index");
const editorRouter = require("./routes/editor");
const authRouter = require("./routes/auth");
const appointmentHandler = require("./routes/appointmentHandler");
//Route Registration
app.use("/", primaryRouter);
app.use("/editor", editorRouter);
app.use("/auth", authRouter);
app.use("/appointments", appointmentHandler);

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "handlebars");
// app.engine(
//   "handlebars",
//   handlebars.engine({
//     extname: "handlebars",
//     defaultLayout: "index",
//     layoutsDir: __dirname + "/views/layouts",
//   })
// );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error.hbs");
});


//Makes the app listen to port 5500
app.listen(port, () => console.log(`App listening to port ${port}`));

module.exports = app;
