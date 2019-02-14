import express from 'express'
import CreateCCCharge from './model/CreateCCCharge.mjs'
const routes = express.Router();

routes.post('/cc', (req, res) => {
    const Charge = new CreateCCCharge(req, res)
    Charge.charge()
})

routes.post('/ach', (req, res) => {
    const Charge = new ACH(req, res)
    Charge.Check()
})

export default routes
