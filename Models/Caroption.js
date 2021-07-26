const { TooManyRequests } = require('http-errors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Car_Option = new Schema({
    Carname :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }


})

module.exports = mongoose.model('Bookings',Car_Option);