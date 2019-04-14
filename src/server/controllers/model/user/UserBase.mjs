import SetStripeKey from './../SetStripeKey'

class UserBase {
	constructor(req, res) {
		this.stripe = SetStripeKey()
		this.req = req
		this.res = res
	}

	getCustomersByEmail() {
		let customer = new Promise((resolve, reject) => {
			var self = this
			this.stripe.customers.list(
				{ email: this.req.body.email },
				(error, customers) => {
					if (error) {
						reject(error)
					} else {
						resolve(customers)
					}
				}
			)
		})
		return customer
	}

	buildUserObject(u) {
		let userData = JSON.parse(u.description)
		userData['id'] = u.id
		userData['default_source'] = u.default_source
		userData['email'] = u.email
		userData['sources'] = u.sources
		return userData
	}
}

export default UserBase
