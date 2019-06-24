const jwt = require('jsonwebtoken')
const UserBase = require('./UserBase.js')

class NewUser extends UserBase {
	constructor(req, res) {
		this.req = req
		this.res = res
	}

	async checkUser() {
		let doesUserExist = this.getUserData()
		if (!doesUserExist) {
			this.createUser()
		}
	}

	createUser() {
		let i = this.req.body
		const query = {
			text: `INSERT INTO users 
              (email, id, stripe_id, lname, fname, organization)
              VALUES
              ($1,$2,$3,$4,$5,$6)`,
			values: [
				i.email.toLowerCase(),
				i.id,
				i.stripe_id,
				i.lname,
				i.fname,
				i.organization
			]
		}
		loginConn
			.query(query)
			.then((data) => datresolvea)
			.catch((e) => reject(e.stack))
	}
}

module.exports = NewUser
