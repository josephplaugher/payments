import express from "express";
//import ACH from "./model/ach/ACH.mjs";
import AddACH from "./model/ach/AddACH.mjs";

const routes = express.Router();

// routes.post("/addACH", (req, res) => {
//   const New = new ACH(req, res)();
//   //New.checkIfCustomerExists();
// });

routes.post("/addACH", AddACH);

export default routes;
