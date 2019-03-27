import express from "express";
import ACH from "./model/ACH.mjs";

const routes = express.Router();

routes.post("/ach", (req, res) => {
  const Charge = new ACH(req, res);
  Charge.checkIfCustomerExists();
});

export default routes;
