const ValRules = {
	settings: {
		mode: process.env.NODE_ENV,
		log: {
			dev: function(data) {
				console.log(data)
			},
			prod: function(data) {
				console.log(data)
			}
		}
	},
	rules: [
		{
			name: 'invoice',
			required: true,
			errorMsg: 'Invoice number required'
		},
		{
			name: 'amount',
			required: true,
			numeric: true,
			errorMsg: 'Payment amount required'
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
}

export default ValRules
