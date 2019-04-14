import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserBase from './UserBase'

class Login extends UserBase {
	constructor(req, res) {
		super()
		this.req = req
		this.res = res
	}

	async start() {
		// get the user info along with their list of sources.
		// we've store the users name and password in the "desription"
		// field on the Stripe customer object. We add the email
		// since that is stored separately and used for searching.
		// finally, we add their list of payment sources for use
		// on the client side.
		let users = await this.getCustomersByEmail()
		let user = users.data[0]
		let userData = this.buildUserObject(user)
		this.checkPassword(this.req, this.res, userData)
	}

	checkPassword(req, res, userData) {
		if (userData) {
			//if the email resulted in a user entry, compare password hashes
			var dbhash = userData.password
			//if the password was hashed in PHP it will contain a '$2y$' hash.
			//if hashed in Node, it will contain a '$2a$a' hash.
			//if the former, we replace it before verifying.
			if (dbhash.includes('$2y$')) {
				dbhash = dbhash.replace(/^\$2y(.+)$/i, '$2a$1')
			}
			//compaare the hashes
			bcrypt.compare(req.body.password, dbhash, (error, result) => {
				if (error) throw new Error(error)
				else if (result == false) {
					res.status(200).json({
						success: false,
						userNotify: { error: 'That email or password is invalid' }
					})
				} else if (result == true) {
					delete userData.password //ensure the pw hash isn't sent along to the client
					// console.log("userdata placed into initial token: ", userData);
					var token = jwt.sign({ userData: userData }, process.env.JWT_SECRET, {
						expiresIn: '1h'
					})
					res.cookie(
						process.env.COOKIE_NAME,
						{ token: token },
						{
							expires: new Date(Date.now() + 60 * 60 * 1000),
							maxAge: 60 * 60 * 1000,
							httpOnly: true,
							secure: process.env.NODE_ENV === 'production'
						}
					)
					res
						.status(200)
						.json({ userNotify: {}, userData: userData, token, token })
				}
			})
		} else {
			//if no matching entry was found, report an error
			res.status(200).json({
				success: false,
				userNotify: { error: 'That email or password is invalid' }
			})
		}
	}
}

export default Login
