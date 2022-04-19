
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://agabek:Mongo.8@cluster0.ocgyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crmdb",{
    // crmdb is used by multiple projects
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log("Established connection to someDB"))
.catch(err => console.log("Something went wrong while connecting", err))
