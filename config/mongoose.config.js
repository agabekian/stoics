const mongoose =  require('mongoose')
mongoose.connect("mongodb://localhost/crmdb",{
    // crmdb is used by multiple projects
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Established connection"))
.catch(err => console.log("Something went wrong while connecting", err))