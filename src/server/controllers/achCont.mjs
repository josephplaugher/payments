import express from 'express'
//import ACH from "./model/ach/ACH.mjs";
import AddACH from './model/ach/AddACH.mjs'
import VerifyACH from './model/ach/VerifyACH'
import PayInvoiceViaACH from './model/ach/PayInvoiceViaACH'
const routes = express.Router()

routes.post('/addACH', AddACH)
routes.post('/verifyACH', VerifyACH)
routes.post('/payInvoiceViaACH', PayInvoiceViaACH)

export default routes
