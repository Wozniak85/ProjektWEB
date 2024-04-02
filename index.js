const express = require('express')
require('dotenv').config() //for configuration
db = require('./database.js')
database = new db.DatabaseInterface(process.env.DB_HOST || 'localhost', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', process.env.DB_DATABASE || 'projekt')
const app = express()
const port = process.env.PORT || 3000 // use port specified in dot env file or 3000

app.get('/health', (req, res) => {
  if (database.isAlive()) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})