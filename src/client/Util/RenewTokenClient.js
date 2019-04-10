const RenewTokenClient = (token) => {
	console.log('token being renewed: ', token)
	sessionStorage.setItem(process.env.TOKEN_NAME, token)
}

export default RenewTokenClient
