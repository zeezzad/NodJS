var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var upload = multer({ dest: 'tmp/' });

app.use(express.static('public'));
var urlcodedParser = bodyParser.urlencoded({ extended: false });

var connection = mysql.createConnection({
connectionLimit: 50,    
host : 'localhost',
user : 'root',
password : '',
database : 'jobreg'
});

connection.connect(function (error) {
    
  if(!!error){
     console.log(error);
  }else{
      console.log('connected');
  }

})

//index
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
    
    connection.query("SELECT * FROM user",function (error, rows, fields) {
        if(!!error){
           console.log('query error');
        }else{
            console.log(rows);
            
        }
    });
});


//get process
app.get('/process_get', function (req, res) {
    response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName
    }
    console.log(response);
    res.end(JSON.stringify(response));
})

//post
app.post('/process_post', urlcodedParser, function (req, res) {

    response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName
    }
    console.log(response);
    res.end(JSON.stringify(response));

})

app.post('/file_upload', upload.any('file'), (req, res) => {
    console.log(req.body, 'Body');
    console.log(req.files, 'files');
    res.end();
  });
  
//server
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listen  att http://%s:%s", host, port);
    console.log("localhost:8081");
})