const Stripe = require('stripe')

function SetStripeKey() {
	var stripeKey
	if (process.env.NODE_ENV === 'production') {
		stripeKey = process.env.STRIPE_SECRET_KEY
	} else {
		stripeKey = process.env.STRIPE_SECRET_TEST_KEY
	}
	return new Stripe(stripeKey)
}

module.exports = SetStripeKey
