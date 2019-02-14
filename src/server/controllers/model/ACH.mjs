import SetStripeKey from './SetStripeKey'

class ACH {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.stripe = SetStripeKey()
  }

  response(resp) {
    this.res.status(200).json({resp })
  }

  verifyAccount() {
    var self = this //bind this context to self var within the callback below
    stripe.customers.create({
        source: this.req.body.token.token.id,
        description: "Example customer"
    }, function(error, customer) {
        if(error) {
            console.log('charge error: ', error)
            self.response({error: error})
          } else {
            console.log('customer: ', customer)
            self.response({customer: customer, userNotify: 'message'})
          }
    });
      
  }


}

export default ACH