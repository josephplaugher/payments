import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'
import checkLoginState from 'Util/CheckLoginState'
import Home from './mainmenu/Home'
import { StripeProvider } from 'react-stripe-elements'

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
			isLoggedIn: false,
			userData: {},
			email: '',
			password: ''
		}
		this.setLoginState = this.setLoginState.bind(this)
		this.response = this.response.bind(this)
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

	response = (res) => {
		if (typeof res.data.userData !== 'undefined') {
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
		if (typeof res.error !== 'undefined') {
			console.error('submit error: ', res.error)
		}
	}

	setStripeKey = () => {
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
		console.log('sign out')
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
					<img src={SetUrl() + '/AppreciateLogo.png'} alt='Appreciate Logo' />
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
					) : (
						<div id='sign-in'>
							<p className='formTitle'>Sign In</p>
							{/* prettier-ignore */}
							<form onSubmit={this.rfa_onSubmit} >
                  <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} autoComplete={true}/>
                  <Input name="password" label="Password" value={this.state.password} onChange={this.rfa_onChange} />
                  <div className="rfa_button-div">
                    <Button id="submit" value="Sign In" />
                  </div>
              </form>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default AppreciateCo
