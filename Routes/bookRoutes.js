var express = require('express');
var Router = express.Router();

var routes= function(book){

    var bookRouter = express.Router();
    bookRouter.route('/').get(function (req, res) {
        console.log('get');
        var query = req.params;
        book.find(query, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(data);
                res.json(data);
            }
        })
    }).post(function (req, res) {
        console.log("called");
        var bookData = new book(req.body);
        bookData.save(function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(data);

                res.status(201).send(data);
            }
        })
    });

    bookRouter.route('/:bookid').get(function(req,res){
        console.log(req.params);
        var id = req.params.bookid;
        book.findById(id ,function(err ,data){
            if(err){
                res.status(500).send(err);
            }else{
                console.log(data);
                res.status(201).send(data);
            }
        });
    }).put(function(req,res){
        console.log("put");
        var id = req.params.bookid;
        book.findById(id ,function(err ,data){
            if(err){
                res.status(500).send(err);
            }else{
                console.log("found");
                console.log(data);

                data.title = req.body.title;
                data.author = req.body.author;
                data.genre = req.body.genre;
                data.save(function(err ,data) {
                    if (err)
                        res.send(err);

                    res.json({ data: data });
                });

            }
        });

    });

    return bookRouter;
}

module.exports = routes;

