var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookModel = new schema({
 title : {
     type: String
 },
 author :{
     type:String
 },
   genre :{
       type :String
   } ,
    read :{
        type:Boolean
    }
});

module.exports =  mongoose.model('book' ,bookModel);

