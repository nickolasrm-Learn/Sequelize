const { Sequelize, DataTypes, Model } = require('sequelize');

// An example of model
// A model is an object used by sequelize to understand how are
// tables stored in a db, and what fields it have.
// A model is used to interface Create, Read, Update and Delete (CRUD) operations with
// the target table.
// It is also used to create new objects when necessary (e.g. Reading something from the db)

// Learn more about models here:
// https://sequelize.org/master/manual/model-basics.html
class Item extends Model 
{
	static init(sequelize)
	{
		// Initializing a model and telling which fields this table have
		// TODO item structure
		// {id: the item id,
		// description: the item description,
		// completed: whether a todo item is completed}
		super.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false
			},
			completed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false, // <- if not provided, will have this value
				allowNull: false
			}
		}, 
		// Dont forget to pass sequelize, the table name too
		{
			sequelize,
			tableName: 'items',
			// If true, sequelize will understand the table have created_at and updated_at fields
			timestamps: false
		})
	}
}

module.exports = Item