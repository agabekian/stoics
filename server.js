const express = require('express');
const cors = require('cors');
const app = express(); 
const mongoose = require('mongoose')

require('dotenv').config() //for heroku 
const path = require("path");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// require('./server/config/mongoose.config')

require('./server/routes/entries.routes')(app)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const conn = mongoose.connection;
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); }); 


const port =  process.env.PORT
app.listen(port, () => console.log(`Now listening on port ${port}`))
