import SetStripeKey from './../../model/SetStripeKey.mjs'

const PayInvoiceViaACH = (req, res) => {
	console.log('headers in payinvoice: ', req.headers.stripeConn)
	const i = req.body
	//console.log('the inputs to verify: ', i)
	const stripe = SetStripeKey()
	// res.status(200).json({ success: true })
	const charge = stripe.charges.create({
		customer: req.headers.stripeConn,
		currency: 'usd',
		amount: i.amount,
		source: i.bankID,
		description: i.invoice
	})
	charge.then((response, error) => {
		//	console.log('stripe res: ', response)
		if (error) {
			console.error('error paying invoice ', error)
			res.status(200).json({ success: false, error: error })
		} else {
			res.status(200).json({ success: true, response })
		}
	})
}

export default PayInvoiceViaACH
