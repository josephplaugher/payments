import SetStripeKey from './../../model/SetStripeKey.mjs'

const VerifyACH = (req, res) => {
	console.log('headers in verifyACH: ', req.headers.stripeConn)
	const i = req.body
	console.log('the inputs to verify: ', i)
	const stripe = SetStripeKey()
	//res.status(200).json({ success: true })
	const verify = stripe.customers.verifySource(
		//verify the correct customer based on their stripe id
		// and the provided bank id
		req.headers.stripeConn,
		i.bankID,
		{
			//amounts of the deposits
			amounts: [i.amount1, i.amount2]
		}
	)
	verify.then((response) => {
		console.log('stripe res: ', response)
		if (response.error) {
			console.error('error verifying bank account ', error)
			res.status(200).json({ success: false, error: error })
		} else {
			res
				.status(200)
				.json({
					success: true,
					userNotify: {
						success:
							'Thank you, your bank account has been verified and is now ready to use for payments!'
					}
				})
		}
	})
}

export default VerifyACH
