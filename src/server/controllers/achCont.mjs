import express from 'express'
//import ACH from "./model/ach/ACH.mjs";
import AddACH from './model/ach/AddACH.mjs'
import VerifyACH from './model/ach/VerifyACH.mjs'
import PayInvoiceViaACH from './model/ach/PayInvoiceViaACH.mjs'
import DeleteBank from './model/ach/DeleteBank.mjs'
const routes = express.Router()

routes.post('/addACH', AddACH)
routes.post('/verifyACH', VerifyACH)
routes.post('/payInvoiceViaACH', PayInvoiceViaACH)
routes.post('/deleteBank', DeleteBank)

export default routes
