const express = require('express')
const CreateCCCharge = require('./model/creditcards/CreateCCCharge')

const routes = express.Router()

routes.post('/cc', (req, res) => {
	const Charge = new CreateCCCharge(req, res)
	Charge.charge()
})

module.exports = routes
