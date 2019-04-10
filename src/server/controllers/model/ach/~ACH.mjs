import SetStripeKey from './../../model/SetStripeKey.mjs'

class ACH {
	constructor(req, res) {
		this.req = req
		this.res = res

		this.stripe = SetStripeKey()
		this.customer = {}
		this.bankStatus = ''
	}

	response(resp) {
		this.res.status(200).json({ resp })
	}

	checkIfCustomerExists() {
		let customers = this.getCustomersByEmail()
		//check for empty array
		if (!Array.isArray(customers) || !customers.length) {
			console.log('create customer')
			this.createCustomer()
		} else {
			// set the customer on the customer property
			this.customer = customers.data[0]
			this.getBankStatus()
			this.decision()
		}
	}

	getCustomersByEmail() {
		console.log('getCustomersByEmail', this.req.body)
		var self = this
		this.stripe.customers.list(
			{ email: this.req.body.email },
			(error, customers) => {
				if (error) {
					console.log('find customer error: ', error)
					self.response({ errorFindingcustomer: error })
				} else {
					console.log('customer: ', customers)
					return customers
				}
			}
		)
	}

	createCustomer() {
		var self = this //bind this context to self var within the callback below
		console.log(
			'creating customer with this source token: ',
			this.req.body.token
		)
		this.stripe.customers.create(
			{
				source: this.req.body.token,
				description: this.req.body.acctholder,
				email: this.req.body.email
			},
			(error, customer) => {
				if (error) {
					console.log('create customer error: ', error)
					self.response({ createCustomerError: error })
				} else {
					console.log('new customer: ', customer)
					self.customer = customer
					this.bankStatus = 'new'
					// this will always result in a request to verify the bank because its a new customer
					this.decision()
				}
			}
		)
	}

	getBankStatus() {
		let bankList = this.customer.data
		i = 0
		var newBank = true
		for (i = 0; bankList.length > 0; i++) {
			if (bankList[i].id === this.req.body.token) {
				this.bankStatus = bankList.status
				newBank = false
			}
		}
	}

	decision() {
		switch (this.bankStatus) {
			// validated and new both indicate and unverified
			// account and we will prompt the user to verify
			case 'new':
			case 'validated':
				this.response({ bankStatus: 'needs verified' })
				break
			// verified means we're ready to charge the customer
			case 'verified':
				this.createCharge()
				break
			// let the customer know the verification failed
			case 'verification_failed':
				this.response({ bankStatus: 'verification failed' })
				break
			case 'errored':
				this.response({ bankStatus: 'error charging account' })
				break
			default:
				this.response({ error: 'error checking bank account status' })
		}
	}

	createCharge() {
		var self = this
		var body = this.req.body
		this.stripe.charges.create(
			{
				customer: this.customer.id,
				amount: body.amount,
				currency: 'usd',
				description: this.pmtDescription()
			},
			(error, charge) => {
				if (error) {
					console.log('charge error: ', error)
					self.response({ error: error })
				} else {
					console.log('customer: ', charge)
					self.response({ bankStatus: 'verified', charge: charge })
				}
			}
		)
	}

	pmtDescription() {
		let memo = this.req.body.memo
		let inv = this.req.body.invoice
		let msg = `Payment for invoice#: ${inv}. Memo: ${memo}`
		return msg
	}
}

export default ACH
