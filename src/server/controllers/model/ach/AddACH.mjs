import SetStripeKey from "./../../model/SetStripeKey.mjs";

const AddACH = (req, res) => {
  console.log("stripe conn id: ", req.headers.stripeConn);
  const stripe = SetStripeKey();
  let newSource = stripe.customers.createSource(req.headers.stripeConn, {
    source: req.body.token
  });
  newSource.then(res => {
    console.log("stire res: ", res);
    if (res.error) {
      console.error("error creating new ACH source: ", error);
      res.status(200).json({ success: false, error: error });
    } else {
      console.log("new source: ", newSource);
      res.status(200).json({ success: true, newSource: newSource });
    }
  });
};

export default AddACH;
