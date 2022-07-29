const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");

require('dotenv').config() //for heroku 
const path = require("path");


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, "./client/build")));
// are Express middleware functions. They are responsible for providing and parsing the request.body data.


require('./server/config/mongoose.config')

require('./server/routes/entries.routes')(app)



const port =  process.env.PORT||8000
app.listen(port, () => console.log(`Now listening on port ${port}`))
