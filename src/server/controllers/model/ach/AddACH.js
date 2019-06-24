const SetStripeKey = require('./../../model/SetStripeKey.js')

const AddACH = (req, res) => {
	const stripe = SetStripeKey()
	let newSource = stripe.customers.createSource(req.headers.stripeConn, {
		source: req.body.token
	})
	newSource.then((response) => {
		if (response.error) {
			res.status(200).json({ success: false, error: error })
		} else {
			res.status(200).json({ success: true, newSource: response })
		}
	})
}

module.exports = AddACH
