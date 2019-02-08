import express from 'express'
import CreateCharge from './model/CreateCharge.mjs'
const routes = express.Router();

routes.post('/pay', (req, res) => {
    const Charge = new CreateCharge(req, res)
    Charge.charge()
})

export default routes
