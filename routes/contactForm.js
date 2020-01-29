const express     = require("express");
const app  = express.Router();
const Contactform        = require("../models/contactForm");

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
  
     const mailOptions = {
      from: mailerAddress, // sender address
      to: mailerAddress, // list of receivers
      subject: 'Message From:' + theActualFirstName +" "+ theActualLastName + " "+ theActualEmail, // Subject line
      html: theActualMessage// plain text body
    };
    const newContactform = new Contactform({
      firstname :theActualFirstName,
      lastname :theActualLastName,
      email : theActualEmail,
      subject: theActualSubject,
      message: theActualMessage,
    })
    newContactform.save()
  //   transporter.sendMail(mailOptions, function (err, info) {
  //     if(err)
  //       console.log(err);
  //     else
  //       console.log(info);
  //  });
    res.redirect('/')
  })
  
  