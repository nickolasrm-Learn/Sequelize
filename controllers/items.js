const item = require('../models/item')

/**
 * Item CRUD
 * A set of asynchronous functions that perform row manipulation into the items table
 */
module.exports = {

	/**
	 * Creates a new entry into the items table
	 * i.e. INSERT INTO items SET ...
	 * @param {String} description 
	 * @returns {Object{id, description, completed}} a object containing the new item entry
	 */
	store: async (description) => {
		return await item.create({
			description
		})
	},

	/**
	 * Returns all entries into the items table
	 * i.e. SELECT * FROM items
	 * @returns {Object{id, description, completed}[]} all items
	 */
	index: async () => {
		return await item.findAll()
	},

	/**
	 * Updates an entry into items table by its id
	 * i.e. UPDATE items SET ...
	 * @param {Int} id the entry id
	 * @param {Object{description, completed}} args an object containing update data. 
	 * 	If one of the values if not defined, the current stored value will be maintained
	 * @returns {Int} 0 if not successful or >0 if successful
	 */
	update: async (id, args) => {
		return await item.update(args, 
			{where: {id}})
	},

	/**
	 * Deletes an entry from the items table
	 * i.e. DELETE FROM items WHERE ...
	 * @param {Int} id the entry id
	 * @returns {Int} 0 if not successful, or >0 if successful
	 */
	delete: async (id) => {
		return await item.destroy({where: {id}})
	}

}