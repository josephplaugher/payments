import SetStripeKey from './../../model/SetStripeKey.mjs'

const AddACH = (req, res) => {
	console.log('stripe conn id: ', req.headers.stripeConn)
	const stripe = SetStripeKey()
	let newSource = stripe.customers.createSource(req.headers.stripeConn, {
		source: req.body.token
	})
	newSource.then((response) => {
		console.log('stire res: ', response)
		if (response.error) {
			console.error('error creating new ACH source: ', error)
			res.status(200).json({ success: false, error: error })
		} else {
			console.log('new source: ', response)
			res.status(200).json({ success: true, newSource: response })
		}
	})
}

export default AddACH
