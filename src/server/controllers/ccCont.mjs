import express from "express";
import CreateCCCharge from "./model/creditcards/CreateCCCharge.mjs";

const routes = express.Router();

routes.post("/cc", (req, res) => {
  const Charge = new CreateCCCharge(req, res);
  Charge.charge();
});

export default routes;
