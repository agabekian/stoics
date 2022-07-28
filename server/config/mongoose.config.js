require('dotenv').config() //for heroku 
const path = require("path");
const mongoose = require('mongoose')
// const url = process.env.MONGODB_URI

// const url = process.env.MONGODB_URI
const url = process.env.MONGODB_URI

// var db = mongoose.connection;
mongoose.connect(url,
{
    
// mongoose.connect(process.env.MONGODB_URI || mongodb+srv://agabek:Mongo.8@cluster0.drmmf.mongodb.net/<quotesDB>?retryWrites=true&w=majority,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true //new add
})
.then(() => console.log("Established connection to Atlas.."))
.catch(err => console.log("Something went wrong while connecting", err))
