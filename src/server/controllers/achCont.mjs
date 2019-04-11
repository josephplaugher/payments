import express from 'express'
//import ACH from "./model/ach/ACH.mjs";
import AddACH from './model/ach/AddACH.mjs'
import VerifyACH from './model/ach/VerifyACH'
import PayInvoiceViaACH from './model/ach/PayInvoiceViaACH'
import DeleteBank from './model/ach/DeleteBank'
const routes = express.Router()

routes.post('/addACH', AddACH)
routes.post('/verifyACH', VerifyACH)
routes.post('/payInvoiceViaACH', PayInvoiceViaACH)
routes.post('/deleteBank', DeleteBank)

export default routes
