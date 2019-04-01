import SetStripeKey from "./../../model/SetStripeKey";

class CreateCharge {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.stripe = SetStripeKey();
  }

  response(resp) {
    this.res.status(200).json({ resp });
  }

  charge() {
    console.log("body: ", this.req.body);
    var self = this; //bind this context to self var within the callback below
    this.stripe.charges.create(
      {
        source: this.req.body.token,
        amount: this.req.body.amount,
        description: "Invoice Number" + this.req.body.invoice,
        currency: "usd"
      },
      function(error, charge) {
        if (error) {
          console.log("charge error: ", error);
          self.response({ error: error });
        } else {
          console.log("charge: ", charge);
          self.response({ charge: charge, userNotify: "message" });
        }
      }
    );
  }
}

export default CreateCharge;
