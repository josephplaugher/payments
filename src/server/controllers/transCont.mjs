import express from "express";
import CreateCCCharge from "./model/CreateCCCharge.mjs";
import ACH from "./model/ACH.mjs";

const routes = express.Router();

routes.post("/cc", (req, res) => {
  const Charge = new CreateCCCharge(req, res);
  Charge.charge();
});

routes.post("/ach", (req, res) => {
  const Charge = new ACH(req, res);
  Charge.checkIfCustomerExists();
});

export default routes;
