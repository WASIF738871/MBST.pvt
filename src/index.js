const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route =require('./route/route')

const app = express();

app.use(bodyParser.json({extended:true}));
app.use('/',route)

const string = "mongodb+srv://WASIF321:Ansari738871@wasifdatabase.wdcjr.mongodb.net/DBST-pvt"
mongoose.connect(string,{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err))

const port = process.env.PORT||3000
app.listen(port,function(){
    console.log("app is running on the PORT "+port)
})