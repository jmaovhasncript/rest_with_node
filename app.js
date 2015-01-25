var application_root = __dirname,
	express = require("express"),
	path = require("path"),
	mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://localhost/db');
app.configure(function () {  // app.configure  is deprocated in 4 *
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "htmlFile"))); // this is used to server static file
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
	res.send('Ecomm API is running');
	console.log(application_root +"hello");
});

// Launch server

app.listen(3000);
