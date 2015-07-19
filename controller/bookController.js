var bookController = function(Book){
    var post  = function (req, res) {
        var bookData = new Book(req.body);
        bookData.save(function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(data);

                res.status(201).send(data);
            }
        })
    };
    var get = function (req, res) {
        var query = req.params;
        Book.find(query, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(data);
                res.json(data);
            }
        })
    }

    return{
        post : post,
        get :get
    }
}

module.exports = bookController;