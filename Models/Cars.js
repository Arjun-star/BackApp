var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cars = new Schema({
    Carname :{
        type:String,
        require:true
    },
    CarType :{
        type:String,
        require:true
    },
    Rent:{
        type:Number,
        require:true
    }

})

module.exports = mongoose.model('CARS',cars);