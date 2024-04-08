const express = require('express')
const cors = require('cors');
require('dotenv').config() //for configuration

db = require('./database.js')
database = new db.DatabaseInterface(process.env.DB_HOST || 'localhost', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', process.env.DB_DATABASE || 'projekt')
const app = express()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000 // use port specified in dot env file or 3000

app.get('/health', (req, res) => {
  if (database.isAlive()) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})


app.post('/addquiz', (req, res) => {
  let data = req.body
  database.addQuiz(data.quizname,data.author,data.questions)
  res.sendStatus(200)
})
app.post('/adduser', async (req, res) => {
  
  let data = req.body
  console.log(data.username,data.email,data.password)
  await database.addUser(data.username,data.email,data.password)
  res.sendStatus(200)
})


app.listen(port, () => {
  database.connect()
  console.log(`Server running on ${port}`)
})