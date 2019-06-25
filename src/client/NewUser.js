import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'
import EB from 'Util/EB'

import 'css/main.css'
import 'css/form.css'
import 'css/userNotify.css'

class NewUser extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/newUser'
		this.valRules = ValRules
		this.stripeKey = ''
		this.state = {
			error: null,
			userData: {},
			userNotify: { message: '' },
			fname: '',
			lname: '',
			organization: '',
			email: '',
			password: ''
		}
		this.response = this.response.bind(this)
	}

	response(resp) {
		this.setState({ userNotify: resp.data.userNotify })
		this.props.response(resp)
	}

	render() {
		return (
			<div id='sign-in'>
				<p className='form-title'>Create New Account</p>
				{/* prettier-ignore */}
				<form onSubmit={this.rfa_onSubmit} >
                    <Input name="fname" label="First Name" value={this.state.fname} onChange={this.rfa_onChange} autoComplete={true}/>  
                    <Input name="lname" label="Last Name" value={this.state.lname} onChange={this.rfa_onChange} autoComplete={true}/>    
                    <Input name="organization" label="Organization Name" value={this.state.organization} onChange={this.rfa_onChange} autoComplete={true}/>
                    <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} autoComplete={true}/>
                    <Input name="password" label="Password" value={this.state.password} onChange={this.rfa_onChange} />
                    <div className="rfa_button-div">
                        <Button id="submit" value="Create Account" />
                    </div>
                </form>
				<div className='rfa_button-div'>
					<Button
						id='login'
						value='Sign in instead'
						onClick={this.props.switchToLogin}
					/>
				</div>
				<UserNotify type='error' error={this.state.userNotify.error} />
				<UserNotify type='message' message={this.state.userNotify.message} />
			</div>
		)
	}
}

export default NewUser
