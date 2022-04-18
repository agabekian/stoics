<<<<<<< HEAD
const mongoose =  process.env.MONGODB_URI || require('mongoose')


// mongoose.connect("mongodb://localhost/crmdb",{
//     // crmdb is used by multiple projects
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
=======
const mongoose =  require('mongoose')
mongoose.connect(MONGODB_URI || "mongodb://localhost/crmdb",{
    // crmdb is used by multiple projects
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
>>>>>>> cb4f0f2efaecb97ef947ca4c7f87ce0ccb457c4c
.then(() => console.log("Established connection to someDB"))
.catch(err => console.log("Something went wrong while connecting", err))
