const jwt = require('jsonwebtoken')
const UserBase = require('./UserBase.js')

class NewUser extends UserBase {
	constructor(req, res) {
		super()
		this.req = req
		this.res = res
	}

	async checkUser() {
		let doesUserExist = await this.getCustomersByEmail()
		if (doesUserExist) {
			this.res.status(200).json({
				userNotify: {
					error: `Looks like you already have an account.
				Try signing in instead.`
				},
				userData: {}
			})
		} else {
			let newUser = await this.createUser()
			if (newUser) {
				this.res.status(200).json({
					userNotify: {
						message: `Thank you! Your account is ready. Please sign in.`
					},
					userData: {}
				})
			}
		}
	}

	createUser() {
		let newCustomer = new Promise((resolve, reject) => {
			let i = this.req.body
			this.stripe.customers.create({ email: i.email }, (error, customer) => {
				console.log('create user error: ', error)
				if (error) {
					reject(error)
				} else {
					resolve(customer)
				}
			})
		})
		return newCustomer
	}
}

module.exports = NewUser
