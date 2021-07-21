const db = require('./db/sequelize')
const express = require('express')
const app = express()
const port = 3000
const apiRouter = require('./routes/api.js')

// If you're having trouble understanding express, look at this repository:
// https://github.com/nickolasrm-Learn/Express-1-VideoStreaming
// NOTE: this project is structured in a MVC form

// Setted express to use json in order to build a restful API
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Checks db connection
// Will run a command into the db to check if it is working properly
/*db.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})*/

// Routes
app.use(apiRouter)

// Creating a request listener
const listener = app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

// Close db connection when the app is closed
process.on('exit', () => {
  app.close()
  db.close()
})

module.exports = {app: listener, db} 