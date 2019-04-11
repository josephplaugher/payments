import Ajax from './Ajax'
import SetUrl from './SetUrl'

const checkLoginState = (newToken) => {
	//a newToken is provided only if CheckLoginState is called after a CRUD operation
	//otherwise the token in sessionStorage will be used. This will only occur
	// on a users page refresh
	var AppCoToken = ''
	if (newToken) {
		// console.log('using new token: ', newToken)
		sessionStorage.setItem(process.env.TOKEN_NAME, newToken)
		AppCoToken = newToken
	} else {
		AppCoToken = sessionStorage.getItem(process.env.TOKEN_NAME)
		// console.log('using token from storage', AppCoToken)
	}
	return new Promise((resolve, reject) => {
		//if there is a token
		if (AppCoToken) {
			Ajax.get(SetUrl() + '/checkLoginState')
				.catch((e) => {
					reject('error checking login state: ', e)
				})
				.then((response) => {
					// console.log('resp: ', response)
					// console.log('token: ', response.headers.token)
					// console.log('authorized: ', response.headers.authorized)
					if (response.headers.token && response.headers.authorized) {
						// console.log('token and cookie are set')
						let userData = JSON.parse(
							sessionStorage.getItem(process.env.USER_DATA_LABEL)
						)
						sessionStorage.setItem(
							process.env.TOKEN_NAME,
							response.headers.token
						)
						resolve({
							isLoggedIn: true,
							userData: userData
						})
					} else {
						// console.log('not authorized, headers not set')
						sessionStorage.removeItem(process.env.USER_DATA_LABEL)
						sessionStorage.removeItem(process.env.TOKEN_NAME)
						resolve({
							isLoggedIn: false,
							userData: {}
						})
					}
				})
		} else {
			//if there is no token
			// console.log('not authorized, no token')
			sessionStorage.removeItem(process.env.USER_DATA_LABEL)
			sessionStorage.removeItem(process.env.TOKEN_NAME)
			resolve({
				isLoggedIn: false,
				userData: {}
			})
		}
	})
}

export default checkLoginState
