// Importing sequelize
const Sequelize = require('sequelize')
// Import its configuration
const config = require('../config/sequelize')
// Importing database models
const Item = require('../models/item')

// Starts a new connection with the database passing the user defined settings
connection = new Sequelize(config)

// Connects the server model with the db
// A server model is an object, representing a table, used by sequelize 
// to communicate and to understand how a table is stored into the db.
Item.init(connection)

module.exports = connection