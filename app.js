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
//Setup a Simple Model Using CRUD (create, read, update, delete)
var Schema = mongoose.Schema;

var Product = new Schema({
	                         title: { type: String, required: true },
	                         description: { type: String, required: true },
	                         style: { type: String, unique: true },
	                         modified: { type: Date, default: Date.now }
                         });

var ProductModel = mongoose.model('Product', Product);

app.get('/api/products', function (req, res){
	return ProductModel.find(function (err, products) {
		if (!err) {
			return res.send(products);
		} else {
			return console.log(err);
		}
	});
});

/**
 * creating a product in the db
 lesson 3 helps us to create a product using post in db after this lesson go to mongoshell
 to verify weather the product is avialable in the db
 how to verify that type mongo in the terminal
 then > show dbs
 shows list of avlaiable dbs for eg
 > show dbs
 admin  (empty)
 db     0.078GB
 local  0.078GB

 then say use db stating that you want to use this db as default now
 use db
 switched to db db

 then show collection
 show collections
 products
 system.indexes

 shows  products which is our collection

 then db.products.find()
 { "_id" : ObjectId("54c492eb2d870e0000000001"), "title" : "My Awesome T-shirt", "description" : "All about the details. Of course it's black.", "style" : "12345", "modified" : ISODate("2015-01-25T06:53:31.960Z"), "__v" : 0 }
 now we find our product here
 */


app.post('/api/products', function (req, res){
	var product;
	console.log("POST: ");
	console.log(req.body);
	product = new ProductModel({
		                           title: req.body.title,
		                           description: req.body.description,
		                           style: req.body.style
	                           });
	product.save(function (err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
	return res.send(product);
});

// Launch server

app.listen(3000);
