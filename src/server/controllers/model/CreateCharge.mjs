import Stripe from 'stripe'

class CreateCharge {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.stripe = ''
    this.setStripeKey()
  }

  response(resp) {
    this.res.status(200).json({resp })
  }

  setStripeKey() {
    var stripeKey
    if (process.env.NODE_ENV === 'production') {
      stripeKey = process.env.STRIPE_SECRET_KEY
    } else {
      stripeKey = process.env.STRIPE_SECRET_TEST_KEY
    }
    this.stripe = new Stripe(stripeKey)
  }

  charge() {
    console.log('body: ', this.req.body)
    var self = this //bind this context to self var within the callback below
    this.stripe.charges.create({
      source: this.req.body.token.token.id,
      amount: this.req.body.amount,
      description: "Invoice Number" + this.req.body.invoice,
      currency: "usd",
    }, function(error, charge) {
      if(error) {
        console.log('charge error: ', error)
        self.response({error: error})
      } else {
        console.log('charge: ', charge)
        self.response({charge: charge})
      }
    })
    
  }

}

export default CreateCharge
