var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var book = require('./model/bookModel');


var mongoURI = "mongodb://localhost:27017/bookApi";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log("error", err.message);
});
MongoDB.once('open', function () {
    console.log("mongodb connection open");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var bookRouter = require('./Routes/bookRoutes')(book);
app.use('/api/books', bookRouter);

// body-parser is piece of middleware which reads the body and parse into json object


app.get('/', function (req, res) {
    res.send('fine');
    res.end();
});

var port = process.env.PORT || 3300;
app.listen(port);