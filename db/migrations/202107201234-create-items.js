const Sequelize = require('sequelize')

// An example of migration
// Migrations are a way to create and to update tables structure
// They are used to create new tables, and also to update its fields.
// Migrations are created with a number before the migration name representing when it was created.
// These numbers are used by sequelize to keep a history of modifications applied to the db
// and to make it possible to undo previous modifications.

// Learn more about migrations here:
// https://sequelize.org/master/manual/migrations.html
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Up is executed by sequelize whenever a migration is run
    // We are telling sequelize the name of the table to be created,
    // and which and how are its fields
    return queryInterface.createTable('items', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    })
  },

  // Down is used by sequelize to undo a migration modification
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {})
  }
}
