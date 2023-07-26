require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3001 || process.env.PORT
const db = require('./config/connection');
const routes = require('./routes')
app.use(express.json())


app.use(routes)
db.on('error',(error)=>{console.error(error)})
db.once('open', () => {
    app.listen(PORT, () => {
        
      console.log('connected to database',` running on port ${PORT}!`);
    });
  });
  