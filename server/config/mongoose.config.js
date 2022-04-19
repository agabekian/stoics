require('dotenv').config() //for heroku 

const mongoose = require('mongoose')
// const url = process.env.MONGODB_URI

// const url = process.env.MONGODB_URI
const url = "mongodb+srv://agabek:Mongo.8@cluster0.ocgyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityretryWrites=true"

mongoose.connect(url,
{
    
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crmdb",{
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true //new add
})
.then(() => console.log("Established connection to Atlas?"))
.catch(err => console.log("Something went wrong while connecting", err))
