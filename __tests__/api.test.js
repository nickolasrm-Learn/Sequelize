const request = require('supertest'),
	httpCodes = require('http-status-codes')
const {app, db} = require('../app')

describe('API POST', () => {
	beforeAll(async () => {
		// Makes the db to create all tables before testing
		// force ensures table are gonna be recreated
		await db.sync({force: true})
	})

	it('Request with no body', async () => {
		const res = await request(app).post('/api')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with wrong description type', async () => {
		const res = await request(app).post('/api')
			.set({description: 4})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Right request', async () => {
		const res = await request(app).post('/api')
			.send({description: 'Testing'})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)
		expect(res.body.description).toBe('Testing')
	})

})

describe('API GET', () => {
	it('Request', async () => {
		const res = await request(app).get('/api')
			.set('Accept', 'application/json')

		expect(res.body[0].description).toBe('Testing')
	})
})

describe('API PUT', () => {

	it('Request with no body', async () => {
		const res = await request(app).put('/api')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with wrong id type', async () => {
		const res = await request(app).put('/api')
			.send({id: 'X', description: 'OK', completed: true})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with wrong types', async () => {
		const res = await request(app).put('/api')
			.send({id: 1, description: 5, completed: 'ok'})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with wrong description type', async () => {
		const res = await request(app).put('/api')
			.send({id: 1, description: 4, completed: false})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with wrong completed type', async () => {
		const res = await request(app).put('/api')
			.send({id: 1, description: 'Test', completed: 4})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})	

	it('Request with invalid id', async () => {
		const res = await request(app).put('/api')
			.send({id: 0, description: 'Test', completed: true})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)
		expect(res.body).toStrictEqual([0])
	})

	it('Changing only description', async () => {
		let res = await request(app).put('/api')
			.send({id: 1, description: 'Test2'})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)

		res = await request(app).get('/api')
		expect(res.body[0].description).toBe('Test2')
		expect(res.body[0].completed).toBe(false)
	})

	it('Changing only completed', async () => {
		let res = await request(app).put('/api')
			.send({id: 1, completed: true})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)

		res = await request(app).get('/api')
		expect(res.body[0].description).toBe('Test2')
		expect(res.body[0].completed).toBe(true)
	})

	it('Changing description and completed', async () => {
		let res = await request(app).put('/api')
			.send({id: 1, description: 'OK', completed: false})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)

		res = await request(app).get('/api')
		expect(res.body[0].description).toBe('OK')
		expect(res.body[0].completed).toBe(false)
	})
})

describe('API DELETE', () => {

	it('Request with no body', async () => {
		const res = await request(app).delete('/api')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with wrong id type', async () => {
		const res = await request(app).delete('/api')
			.send({id: 'X'})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.BAD_REQUEST)
	})

	it('Request with invalid id', async () => {
		const res = await request(app).delete('/api')
			.send({id: 0})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)
		expect(res.body).toStrictEqual(0)
	})

	it('Right request', async () => {
		let res = await request(app).delete('/api')
			.send({id: 1})
			.set('Accept', 'application/json')
		expect(res.status).toBe(httpCodes.StatusCodes.OK)

		res = await request(app).get('/api')
		expect(res.body).toStrictEqual([])
	})

	afterAll(() => {
		app.close()
		db.close()
	})
})