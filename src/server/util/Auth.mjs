import jwt from 'jsonwebtoken'

class Auth {
	constructor(req, res, next) {
		this.req = req
		this.res = res
		this.next = next
		this.cookieName = process.env.COOKIE_NAME
		this.cookie = {}
		this.csrf = ''
		this.authorized = 'authorized'
		this.start()
	}

	start() {
		console.log('auth')
		//check if cookie and token exist
		if (this.req.cookies[this.cookieName] && this.req.headers.csrf) {
			console.log('cookie and token exist')
			console.log(
				'cookie: ',
				this.req.cookies[this.cookieName].token,
				'and token: ',
				this.req.headers.csrf
			)
			this.compare()
		} else {
			console.log('cookie or token does not exist')
			this.unsetLoginHeaders()
		}
	}

	compare() {
		const cookie = this.req.cookies[this.cookieName]
		const csrf = this.req.headers.csrf
		//if cookie and token exist and the token is valid, check that they are the same
		if (cookie.token === csrf) {
			console.log('cookie and token are equal')
			var verifiedToken
			try {
				verifiedToken = jwt.verify(csrf, process.env.JWT_SECRET)
			} catch (error) {
				console.log('error verifying token: ', error)
				this.unsetLoginHeaders()
			}
			//console.log("verified token: ", verifiedToken);
			//if the token and cookie match, renew them
			this.renewLogin(verifiedToken)
		} else {
			console.log('cookie and token are not equal')
			this.unsetLoginHeaders()
		}
	}

	renewLogin(verifiedToken) {
		//upon authentication, renew the token and the cookie
		this.req.headers['stripeConn'] = verifiedToken.userData.id
		delete verifiedToken.exp
		console.log('userdata placed into renewed token: ', verifiedToken)
		var token = jwt.sign({ userData: verifiedToken }, process.env.JWT_SECRET, {
			expiresIn: '1h'
		})
		this.res.cookie(
			process.env.COOKIE_NAME,
			{ token: token },
			{
				expires: new Date(Date.now() + 60 * 60 * 1000),
				maxAge: 60 * 60 * 1000,
				httpOnly: true,
				secure: process.env.NODE_ENV
			}
		)
		this.setLoginHeaders(token)
	}

	setLoginHeaders(token) {
		this.res.header(this.authorized, true)
		this.res.header('token', token)
		this.next()
	}

	unsetLoginHeaders() {
		this.res.header(this.authorized, '')
		this.res.header('token', '')
		this.next()
	}
}

export default Auth
