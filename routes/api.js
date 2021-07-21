const express = require('express'),
	router = express.Router(),
	items = require('../controllers/items'),
	httpCodes = require('http-status-codes')

/* An API is a way for a client to communicate with a server
 In this case, it is an interface where you can interact through an HTTP protocol
 The following example connects the four HTTP protocol methods with a Postgres database */

// Creates a post /api route to store new items into the items table
// Should receive a json containing the description of a new item
router.post('/api', async (req, res) => {
	const body = req.body
	// This verification is necessary in order to avoid incomplete requests or 
	// hacking attacks sending bad requests and, then, shutting down the server
	// through an error exploit
	if (validDescription(body)) return res.json(await items.store(body.description))
	else return answerBadRequest(res)
})

// Creates a get /api route to get all item from the items table
router.get('/api', async (req, res) => {
	return res.json(await items.index())
})

// Creates a put /api route to update an item entry from the table
// Should receive a json containing the entry id, its new description (optional) 
// and its new completed (optional) state
router.put('/api', async (req, res) => {
	const body = req.body
	id = body.id
	args ={}

	// Checks if all fields to be updated are valid
	if(!validId(body)) return answerBadRequest(res)
	// Not all fields should me modified, you can pass only what fields you want to edit
	// That is why args is being filled after checking
	if(!validCompleted(body, true)) return answerBadRequest(res)
	else args.completed = body.completed
	if(!validDescription(body, true)) return answerBadRequest(res)
	else args.description = body.description

	return res.json(await items.update(id, args))
})

// Creates a put /api route to update an item entry from the table
// Should receive a json containing the entry id
router.delete('/api', async (req, res) => {
	const body = req.body
	if(validId(body)) return res.json(await items.delete(body.id))
	else return answerBadRequest(res)
})

/**
 * Checks if a request body has a valid id
 * @param {Body} body request body
 * @returns {Boolean} true if valid or false if not
 */
function validId(body)
{
	const id = body.id
	if(!Number.isInteger(id)) return false
	else return true
}

/**
 * Checks if a request body has a valid description
 * @param {Body} body a request body
 * @param {Boolean} optional true if the field is optional
 * @returns {Boolean} true if valid or false if not
 */
function validDescription(body, optional=false)
{
	const description = body.description
	if((description || !optional) && typeof description != 'string') return false
	else return true
}

/**
 * Checks if a request body has a valid completed flag
 * @param {Body} body a request body
 * @param {Boolean} optional true if the field is optional
 * @returns {Boolean} true if valid or false if not
 */
function validCompleted(body, optional=false)
{
	const completed = body.completed
	if((completed || !optional) && typeof completed != 'boolean') return false
	else return true
}

/**
 * Answers a response with bad request
 * @param {Response} res 
 */
function answerBadRequest(res)
{ return res.status(httpCodes.StatusCodes.BAD_REQUEST).send(httpCodes.ReasonPhrases.BAD_REQUEST) }

module.exports = router