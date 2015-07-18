var express = require('express');
var app = express();

app.get('/' ,function(req ,res){
 res.send('fine');
    res.end();
});

console.log(process.env.PORT);
var port = process.env.PORT|| 3300;
app.listen(port);