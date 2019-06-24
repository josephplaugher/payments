const express = require('express')
const AddACH = require('./model/ach/AddACH')
const VerifyACH = require('./model/ach/VerifyACH')
const PayInvoiceViaACH = require('./model/ach/PayInvoiceViaACH')
const DeleteBank = require('./model/ach/DeleteBank')
const routes = express.Router()

routes.post('/addACH', AddACH)
routes.post('/verifyACH', VerifyACH)
routes.post('/payInvoiceViaACH', PayInvoiceViaACH)
routes.post('/deleteBank', DeleteBank)

module.exports = routes
