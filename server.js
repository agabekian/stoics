const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config() //for heroku 


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./server/config/mongoose.config')

require('./server/routes/entries.routes')(app)

const port =  process.env.PORT||8000
app.listen(port, () => console.log(`Now listening on port ${port}`))
