const SetStripeKey = require('./../../model/SetStripeKey.js')

const VerifyACH = (req, res) => {
	const i = req.body
	const stripe = SetStripeKey()
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
		if (response.error) {
			res.status(200).json({ success: false, error: error })
		} else {
			res.status(200).json({
				success: true,
				userNotify: {
					success:
						'Thank you, your bank account has been verified and is now ready to use for payments!'
				}
			})
		}
	})
}

module.exports = VerifyACH
