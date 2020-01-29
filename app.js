require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var contactForm = require('./routes/contactForm');
const session       = require("express-session");
const flash         = require("connect-flash");
const favicon      = require('serve-favicon');

var app = express();
const mongoose = require('mongoose');

// 'mongodb://localhost:27017/TestDB'
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// app.get('/contactForm/9320', function (req, res) {
//   // .find()
//   Contactform.find()
//     .then(contactForm => { 
//       // console.log(contactForm[0]);
//       let data = {};
//       data.theList = contactForm;
//       //console.log(data.theList);
//       res.render('contactFormData', data)
//   })
//   .catch(theError => {console.log(theError)})
// })




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

var viewPath = path.join(__dirname, 'views');

app.set('views', viewPath);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(flash());

app.use('/', indexRouter);
app.use('/', contactForm);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;
