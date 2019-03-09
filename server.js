const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now= new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) =>{
//   res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('capital', (text)=>{
  return text.toUpperCase();
});


app.get('/',(req, res)=>{
  res.render('home.hbs',{
    welcomeMessage: 'Welcome',
    //currentYear: new Date().getFullYear()
    });
});
 app.get('/about',(req, res)=>{
   res.render('about.hbs',{
     pageTitle: 'About page',
     //currentYear: new Date().getFullYear()
   })
});
app.get('/bed',(req, res)=>{
  res.send('Unable to fetch data');
});
app.listen((3000),
console.log("port is working"));
