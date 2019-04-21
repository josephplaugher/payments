import Ajax from './Ajax'
import SetUrl from './SetUrl'

const checkLoginState = (newToken) => {
	//a newToken is provided only if CheckLoginState is called after a CRUD operation
	//otherwise the token in sessionStorage will be used. This will only occur
	// on a users page refresh
	var AppCoToken = ''
	if (newToken) {
		sessionStorage.setItem(process.env.TOKEN_NAME, newToken)
		AppCoToken = newToken
	} else {
		AppCoToken = sessionStorage.getItem(process.env.TOKEN_NAME)
	}
	return new Promise((resolve, reject) => {
		//if there is a token
		if (AppCoToken) {
			Ajax.get(SetUrl() + '/checkLoginState')
				.catch((e) => {
					reject('error checking login state: ', e)
				})
				.then((response) => {
					if (response.headers.token && response.headers.authorized) {
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
