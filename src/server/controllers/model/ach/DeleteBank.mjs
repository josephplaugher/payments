import SetStripeKey from './../../model/SetStripeKey.mjs'

const DeleteBank = (req, res) => {
	console.log('stripe conn id: ', req.headers.stripeConn)
	const stripe = SetStripeKey()
	console.log('bank to delete: ', req.body.bankID)
	//res.status(200).json({ success: true })
	let deleteSource = stripe.customers.deleteSource(
		req.headers.stripeConn,
		req.body.bankID
	)
	deleteSource.then((response) => {
		if (response.error) {
			console.error('error creating new ACH source: ', error)
			res.status(200).json({ success: false, error: error })
		} else {
			console.log('deleted bank: ', response)
			res.status(200).json({ success: true, deleted: response })
		}
	})
}

export default DeleteBank
