const Logout = (req, res) => {
	let currentPayload = req.cookies[process.env.COOKIE_NAME].token
	console.log('make one file for importing the cookie payload across routes')
	res.clearCookie(
		process.env.COOKIE_NAME,
		{ token: currentPayload },
		{
			expires: new Date(Date.now() + 60 * 60 * 1000),
			maxAge: 60 * 60 * 1000,
			httpOnly: true,
			secure: process.env.NODE_ENV
		}
	)
	res.status(200).json({ loggedout: true })
}

module.exports = Logout
