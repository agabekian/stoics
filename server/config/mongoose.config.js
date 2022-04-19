const mongoose = require('mongoose')

<<<<<<< HEAD
const mongoose = require('mongoose')

=======
>>>>>>> 8a62aea51dbeb9a3b9f6c181ca2be8025bda9866
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crmdb",{
    // crmdb is used by multiple projects
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log("Established connection to someDB"))
.catch(err => console.log("Something went wrong while connecting", err))
