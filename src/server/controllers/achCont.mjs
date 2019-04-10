import express from 'express'
//import ACH from "./model/ach/ACH.mjs";
import AddACH from './model/ach/AddACH.mjs'
import VerifyACH from './model/ach/VerifyACH'
const routes = express.Router()

routes.post('/addACH', AddACH)
routes.post('/verifyACH', VerifyACH)

export default routes
