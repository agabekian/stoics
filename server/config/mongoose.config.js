
const mongoose = require('mongoose')

const url = "mongodb+srv://agabek:Mongo.8@cluster0.ocgyc.mongodb.net/Cluster0?retryWrites=true&w=majority"

mongoose.connect(url,
{
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crmdb",{
    // crmdb is used by multiple projects
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true //new add
})
.then(() => console.log("Established connection to Atlas?"))
.catch(err => console.log("Something went wrong while connecting", err))
