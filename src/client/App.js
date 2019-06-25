import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/Home'
import Login from './Login'
import NewUser from './NewUser'
import { StripeProvider } from 'react-stripe-elements'
import Logo from './AppreciateLogo.png'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

class AppreciateCo extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/login'
		this.valRules = ValRules
		this.stripeKey = ''
		this.state = {
			error: null,
			userNotify: {},
			isLoggedIn: true,
			newUser: false,
			login: false,
			userData: {},
			email: '',
			password: ''
		}
		this.setLoginState = this.setLoginState.bind(this)
		this.loginResponse = this.loginResponse.bind(this)
		this.newUserResponse = this.newUserResponse.bind(this)
		this.switchToCreateAccount = this.switchToCreateAccount.bind(this)
		this.switchToLogin = this.switchToLogin.bind(this)
		this.setStripeKey = this.setStripeKey.bind(this)
		this.refreshStripeSources = this.refreshStripeSources.bind(this)
		this.signOut = this.signOut.bind(this)
		this.setStripeKey()
		this.setLoginState()
	}

	setLoginState = () => {
		let auth = checkLoginState()
		auth.then((res) => {
			if (res.isLoggedIn === true) {
				this.setState({
					isLoggedIn: res.isLoggedIn,
					userData: res.userData
				})
			} else {
				this.setState({
					isLoggedIn: false,
					userData: {}
				})
			}
		})
	}

	switchToCreateAccount() {
		this.setState({ login: false, newUser: true })
	}

	switchToLogin() {
		this.setState({ login: true, newUser: false })
	}

	loginResponse(res) {
		if (res.data.userData) {
			sessionStorage.setItem(
				process.env.USER_DATA_LABEL,
				JSON.stringify(res.data.userData)
			)
			sessionStorage.setItem(process.env.TOKEN_NAME, res.data.token)
			this.setState({
				// token: res.data.token,
				userNotify: res.data.userNotify,
				userData: res.data.userData,
				isLoggedIn: true
			})
		}
		if (res.error) {
			console.error('submit error: ', res.error)
		}
	}

	newUserResponse(res) {
		if (res.data.success) {
			this.setState({ userNotify: res.data.userNotify })
		}
		if (res.data.error) {
			console.error('submit error: ', res.error)
		}
	}

	setStripeKey() {
		if (process.env.NODE_ENV === 'production') {
			this.stripeKey = process.env.STRIPE_PUB_KEY
		} else {
			this.stripeKey = process.env.STRIPE_TEST_KEY
		}
	}

	refreshStripeSources() {
		Ajax.get(SetUrl() + '/refreshStripeSources').then((res) => {
			this.setState({ userData: res.data.userData })
		})
	}

	signOut() {
		sessionStorage.removeItem(process.env.USER_DATA_LABEL)
		sessionStorage.removeItem(process.env.TOKEN_NAME)
		this.setState({
			isLoggedIn: false,
			userData: {}
		})
		Ajax.get(SetUrl() + '/user/logout')
	}

	render() {
		return (
			<div id='container'>
				<div id='logoBox'>
					<img src={Logo} alt='Appreciate Logo' />
				</div>
				<div>
					{this.state.isLoggedIn ? (
						<EB comp='Home'>
							<StripeProvider apiKey={this.stripeKey}>
								<Home
									userData={this.state.userData}
									resfreshSources={this.refreshStripeSources}
									signOut={this.signOut}
								/>
							</StripeProvider>
						</EB>
					) : null}
					{this.state.login ? (
						<>
							<Login
								response={this.loginResponse}
								switchToCreateAccount={this.switchToCreateAccount}
							/>
						</>
					) : null}
					{this.state.newUser ? (
						<>
							<NewUser
								response={this.newUserResponse}
								switchToLogin={this.switchToLogin}
							/>
						</>
					) : null}
				</div>
			</div>
		)
	}
}

export default AppreciateCo
