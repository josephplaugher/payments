const ValRules = [
	{ mode: process.env.NODE_ENV },
	{
		log: {
			dev: function(data) {
				console.log(data)
			},
			prod: function(data) {
				console.log(data)
			}
		}
	},
	{
		name: 'invoice',
		required: true,
		alphanumeric: 'true',
		errorMsg: 'Please enter the number of the invoice you wnat to pay'
	},
	{
		name: 'amount',
		required: true,
		numeric: true,
		errorMsg: 'Please enter a payment amount'
	},
	{
		name: 'amount1',
		required: true,
		numeric: true,
		errorMsg: 'Enter the first verification deposit from your bank account'
	},
	{
		name: 'amount2',
		required: true,
		numeric: true,
		errorMsg: 'Enter the second verification deposit from your bank account'
	}
]

export default ValRules
