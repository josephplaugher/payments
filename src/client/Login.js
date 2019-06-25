import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import EB from 'Util/EB'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

class Login extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/login'
		this.valRules = ValRules
		this.stripeKey = ''
		this.state = {
			error: null,
			userData: {},
			email: '',
			password: ''
		}
		this.response = this.response.bind(this)
	}

	response(resp) {
		this.props.response(resp)
	}

	render() {
		return (
			<div id='sign-in'>
				<p className='form-title'>Sign In</p>
				{/* prettier-ignore */}
				<form onSubmit={this.rfa_onSubmit} >
                  <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} autoComplete={true}/>
                  <Input name="password" label="Password" value={this.state.password} onChange={this.rfa_onChange} />
                  <div className="rfa_button-div">
                    <Button id="submit" value="Sign In" />
                  </div>
                </form>
				<div className='rfa_button-div'>
					<Button
						id='createAccount'
						value='Create Account'
						onClick={this.props.switchToCreateAccount}
					/>
				</div>
				<div className='rfa_button-div'>
					<Button id='resetPassword' value='Reset Password' />
				</div>
			</div>
		)
	}
}

export default Login
