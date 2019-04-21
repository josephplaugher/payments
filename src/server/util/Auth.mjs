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
		//check if cookie and token exist
		if (this.req.cookies[this.cookieName] && this.req.headers.csrf) {
			this.compare()
		} else {
			this.unsetLoginHeaders()
		}
	}

	compare() {
		const cookie = this.req.cookies[this.cookieName]
		const csrf = this.req.headers.csrf
		//if cookie and token exist and the token is valid, check that they are the same
		if (cookie.token === csrf) {
			var verifiedToken
			try {
				verifiedToken = jwt.verify(csrf, process.env.JWT_SECRET)
			} catch (error) {
				this.unsetLoginHeaders()
			}
			//if the token and cookie match, renew them
			this.renewLogin(verifiedToken, cookie.token)
		} else {
			this.unsetLoginHeaders()
		}
	}

	renewLogin(verifiedToken, prevCookiePayload) {
		//upon authentication, renew the token and the cookie
		this.req.headers['stripeConn'] = verifiedToken.userData.id
		delete verifiedToken.exp
		var token = jwt.sign(
			{ userData: verifiedToken.userData },
			process.env.JWT_SECRET,
			{
				expiresIn: '1h'
			}
		)
		//clear the current cookie
		this.clearCurrentCookie(prevCookiePayload)
		//set new cookie that matches new token
		this.setNewCookie(token)
		//set headers and send response or move to next route
		this.setLoginHeaders(token)
	}

	clearCurrentCookie() {
		this.res.clearCookie(process.env.COOKIE_NAME, {
			expires: new Date(Date.now() + 60 * 60 * 1000),
			maxAge: 60 * 60 * 1000,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production'
		})
	}

	setNewCookie(token) {
		this.res.cookie(
			process.env.COOKIE_NAME,
			{ token: token },
			{
				expires: new Date(Date.now() + 60 * 60 * 1000),
				maxAge: 60 * 60 * 1000,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production'
			}
		)
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
