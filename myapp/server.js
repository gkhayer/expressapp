const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient


//express doesn't handle reading data from the form use - body-parser
//body-parser is a middleware
//middleware - Basically plugins that change the request or response object before they get handled by our application
// urlencoded method within the body parser tell body parser to extract data from the form
app.use(bodyParser.urlencoded({extended: true}))
//listen = helps create a server where browers can connect to.

//Database

var dp;

MongoClient.connect('mongodb://gagan16:Rupinder30@ds235418.mlab.com:35418/expressapp', (err, client) => {
  if(err)
  return console.log(err)
  db = client.db('expressapp')
  app.listen(3000, function() {
    console.log('Hello,listening to port 3000');
  })
})


app.set('view engine', 'ejs')

//to read, browser send a GET request to the server.
//app.get(path, callback)
//callback takes two arguments - function(request, response) {}
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if(err)
    return console.log(err)
    console.log('saved to db');
    res.redirect('/')
  })
})
