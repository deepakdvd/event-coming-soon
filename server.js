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
   host: 'smtp.zoho.com',
    port: 465,
    secure: true, 
    //service: 'gmail',
  auth: {
    user: 'deepakdesai19@picagroexporter.com',
    pass: '*2468492383@sandvd'
  }
});

var mailOptions = {
  from: 'deepakdesai19@picagroexporter.com',
  to: req.body.email,
  subject: 'You Have Successfully login for The Event',
  html: '<h1></h1><br><h2>Name:"'+req.body.fname+''+req.body.lname+'"</h2><br>Email Id:<b>"'+req.body.email+'"</b><br>Contact No : <a href="tel:'+req.body.phone+'"></a><br>Message :<b>"'+req.body.message+'"<b/>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.redirect('/?resp='+true);
  }
});


});





http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});

