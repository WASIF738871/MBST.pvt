const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    userName : {
        type :String,
        require:true,
        trim:true
    },
    email :{
        type :String,
        require :true,
        trim :true
    },
    password:{
        type :String,
        require :true,
        trim :true
    }

},{timesStamps:true})

module.exports = mongoose.model('User',userSchema)
