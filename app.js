var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nodemailer = require('nodemailer');
var mailerAddress = "mirafusiontestform@gmail.com";
var mailerPassword = "Password1234!";
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: mailerAddress,
         pass: mailerPassword
     }
 });

var app = express();


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TestDB', {useNewUrlParser: true});
const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const contactformsSchema = new Schema ({
firstname: String,
lastname: String,
email: String,
subject: String,
message: String,
})

const Contactform = mongoose.model('Contactform', contactformsSchema)

app.get('/contactForm/9320', function (req, res) {
  // Movie.find()
  Contactform.find()
    .then(contactForm => { 
      // console.log(contactForm[0]);
      // console.log(movies[0].title);
      let data = {};
      data.theList = contactForm;
      console.log(data.theList);
      res.render('contactFormData', data)
  })
  .catch(theError => {console.log(theError)})
})

// Get request after movie creation
app.get('/contactForm', function (req, res) {
  res.render('contactForm')
})

// // Submitted contact form
app.post('/contactForm', function (req, res) {
  //  console.log("req body", req.body);

   const theActualFirstName = req.body.firstname;
   const theActualLastName = req.body.lastname
   const theActualEmail = req.body.email
   const theActualSubject = req.body.subject
   const theActualMessage = req.body.message



  const newContactform = new Contactform({
    firstname :theActualFirstName,
    lastname :theActualLastName,
    email : theActualEmail,
    subject: theActualSubject,
    message: theActualMessage,
  })

  newContactform.save()
  .then(contactForm => {
    //console.log(movie);
  })
  .catch(theError => { 
    console.log(theError)
  })

  res.redirect('/')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
