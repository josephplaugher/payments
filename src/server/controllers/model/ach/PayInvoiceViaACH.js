const SetStripeKey = require('./../../model/SetStripeKey.js')

const PayInvoiceViaACH = (req, res) => {
	const i = req.body
	const stripe = SetStripeKey()
	const charge = stripe.charges.create({
		customer: req.headers.stripeConn,
		currency: 'usd',
		amount: i.amount,
		source: i.bankID,
		description: i.invoice
	})
	charge.then((response, error) => {
		if (error) {
			res.status(200).json({ success: false, error: error })
		} else {
			res.status(200).json({ success: true, response })
		}
	})
}
module.exports = PayInvoiceViaACH
