const mongoose = require('mongoose');
const admin_schema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model("Admin_Crediantals",admin_schema);