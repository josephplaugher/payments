const SetStripeKey = require('./../../model/SetStripeKey.js')

const DeleteBank = (req, res) => {
	const stripe = SetStripeKey()
	let deleteSource = stripe.customers.deleteSource(
		req.headers.stripeConn,
		req.body.bankID
	)
	deleteSource.then((response) => {
		if (response.error) {
			res.status(200).json({ success: false, error: error })
		} else {
			res.status(200).json({ success: true, deleted: response })
		}
	})
}

module.exports = DeleteBank
