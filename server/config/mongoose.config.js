const mongoose =  require('mongoose')
mongoose.connect(MONGODB_URI || "mongodb://localhost/crmdb",{
    // crmdb is used by multiple projects
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Established connection to someDB"))
.catch(err => console.log("Something went wrong while connecting", err))
