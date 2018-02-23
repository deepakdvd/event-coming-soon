'use strict';
var ex = require('express');
var nodemailer = require('nodemailer');
var app=ex();
var http = require('http').Server(app);
var bParser = require('body-parser');
app.set('port', (process.env.PORT || 8080));

app.set('view engine','ejs');
app.use(ex.static('public'));

app.use(bParser.json());
app.use(bParser.urlencoded({extended:false}));

app.get('/',function(req,res){
  if(req.query.resp){
    
    res.render('index',{send:true});
  }else{
    res.render('index',{send:false});
  }
  
  });


app.post('/email',function(req, res){

  var transporter = nodemailer.createTransport({
   host: 'mail.amoreentertainment.in',
    port: 465,
    secure: true,
    tls: {
        rejectUnauthorized: false
    }, 
    //service: 'gmail',
  auth: {
    user: 'sumit@amoreentertainment.in',
    pass: 'sumit@123'
  }
});

var mailOptions = {
  from: 'sumit@amoreentertainment.in',
  to: req.body.email,
  subject: 'You Have Successfully login for The Event',
  html: '<h1>You Have Successfully login for The Event</h1><br><a href="www.amoreentertainment.in">amoreentertainment.in</a>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.redirect('http://amoreentertainment.in');
  }
});

//this is currently added for sending event holder mail
var mailOptions1 = {
  from: 'sumit@amoreentertainment.in',
  to: 'sumit@amoreentertainment.in',
  subject: req.body.email+'Have Successfully login for The Event',
  html: '<h1>Email:'+req.body.email+' Have Successfully login for The Event</h1><br><a href="www.amoreentertainment.in">amoreentertainment.in</a><br>Name:'+req.body.fname+req.body.lname+'<br>Phone:'+req.body.phone+'<br>Message:'+req.body.message
};

transporter.sendMail(mailOptions1, function(error, info){
  if (error) {
    return console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  
  }
});
//end here


});


http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});

