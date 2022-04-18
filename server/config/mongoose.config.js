const mongoose =  process.env.MONGODB_URI || require('mongoose')


// mongoose.connect("mongodb://localhost/crmdb",{
//     // crmdb is used by multiple projects
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
.then(() => console.log("Established connection to someDB"))
.catch(err => console.log("Something went wrong while connecting", err))