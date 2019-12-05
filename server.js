var http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
var mysql      = require('mysql');
const app = express()

//start mysql connection
var connection = mysql.createConnection({
    host     : 'localhost', //mysql database host name
    user     : 'root', //mysql database user name
    password : 'root', //mysql database password
    database : 'testcases' //mysql database name
  });  
  
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
  })

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index'); 
})

app.post('/addsteps', function (req, res)
 {
    let action = req.body.action;
    let target = req.body.target;
    let value = req.body.value;
   // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
   //INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
   var params  = {StepAction: action, StepTarget: target, StepValue: value};
   var query = connection.query('INSERT INTO Testdata_one SET ?', params, function (error, results, fields) {
    if (error) throw error;
    // Neat!
  });
  res.end('Record has been inserted!');
  console.log("Success");
  console.log(query.sql); 
  })

  app.post('/deleteStep', function (req, res) {
    //console.log(req.body);
    let stepNo=req.body.stepNo;
    var query=connection.query('DELETE FROM `Testdata_one` WHERE `StepNo`=?', stepNo, function (error, results, fields)
    {
       if (error) throw error;
    });
       console.log(query.sql); 
       res.end('Record has been deleted!');

     })

  var server = app.listen(3300,  "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  });
  