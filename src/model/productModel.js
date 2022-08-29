const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
    name : {
        type :String,
        unique :true,
        require :true,
        trim :true
    },
    quantity :{
        type :Number,
        require :true,
        trim :true
    },
    amount :{
        type :Number,
        require :true,
        trim :true
    },
    soledAt:{
        type:String,
    }

},{timesStamps:true})

module.exports = mongoose.model('Product',productSchema)
