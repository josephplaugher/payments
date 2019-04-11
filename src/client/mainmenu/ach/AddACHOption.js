import React from 'react'
import { Input, Button } from 'reactform-appco'
import Select from 'Util/Select'
import StripeInput from 'Util/StripeInput'
import Validate from 'Util/Validate'
import ValRules from 'Util/ValRules'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import { Elements, injectStripe } from 'react-stripe-elements'

import 'css/main.css'
import 'css/logo.css'
import 'css/form.css'

class AddACHOption extends React.Component {
	constructor(props) {
		super(props)
		this.valRules = ValRules
		this.state = {
			userNotify: {},
			userErrors: {},
			email: '',
			password: 'test',
			invoice: 'test',
			type: 'individual',
			acctholder: '',
			acctno: '000123456789',
			routingno: '110000000',
			amount: '500',
			submitData: {},
			showVerifyPrompt: false
		}
		this.onChange = this.onChange.bind(this)
		this.onStripeChange = this.onStripeChange.bind(this)
		this.addACH = this.addACH.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.sendToken = this.sendToken.bind(this)
		this.response = this.response.bind(this)
		this.close = this.close.bind(this)
	}

	onChange = (event) => {
		const name = event.target.name
		this.setState({
			[name]: event.target.value
		})
	}

	onStripeChange = (event) => {
		const id = event.target.id
		this.setState({
			[id]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		const data = {
			id: this.props.userData.id
		}
		let val = new Validate(data, this.valRules)
		let prom = val.isError()
		prom.then((error) => {
			if (error.hasError) {
				// if there a problem with the invoice number or amount, stop the flow
				this.setState({
					userNotify: error
				})
			} else {
				// after the invoice number and amount are validated
				// create the token
				this.setState({ submitData: data })
				this.addACH()
			}
		})
	}

	addACH() {
		let getToken = this.props.stripe.createToken('bank_account', {
			country: 'US',
			currency: 'usd',
			routing_number: this.state.routingno,
			account_number: this.state.acctno,
			account_holder_name: this.state.acctholder,
			account_holder_type: this.state.type
		})
		getToken.then((res) => {
			if (typeof res.error !== 'undefined') {
				console.log('stripe error: ', res.error)
				this.setState({
					userErrors: {
						stripeInputError: res.error
					}
				})
			} else {
				console.log('Received Stripe token:', res.token)
				let data = Object.assign({ token: res.token.id }, this.state.submitData)
				//send the token to the server using the correct route for this payment method
				this.sendToken(data, '/addACH')
			}
		})
	}

	sendToken = (data, route) => {
		console.log('the data: ', data)
		Ajax.post(SetUrl() + route, data).then((res) => {
			this.response(res)
		})
	}

	response = (res) => {
		if (res.error) {
			// something
		} else {
			this.setState({
				userNotify: {
					success:
						'You have added a new bank account. ' +
						this.props.needsValidatedMessage
				}
			})
		}
	}

	close() {
		this.setState({ showVerifyPrompt: false })
	}

	render() {
		const typeOptions = ['Individual', 'Business']

		return (
			<div id='form-container'>
				{/* prettier-ignore */}
				<div id="add-new-bank">
		<p className="formTitle">Add New Bank Account</p>
        	<form onSubmit={this.onSubmit} >
        	    <Elements>
        	        <StripeInput id="acctholder" label="Account Holder Name" value={this.state.acctholder} error={this.state.userErrors.acctholder} onChange={this.onStripeChange} />
        	    </Elements>
        	    <Elements>
        	        <Select id="type" label="Account Holder Type" options={typeOptions} value={this.state.type} onChange={this.onChange} />
        	    </Elements>
        	    <Elements>
        	        <StripeInput id="acctno" label="Bank Account Number" value={this.state.acctno} error={this.state.userErrors.acctno} onChange={this.onStripeChange} />
        	    </Elements>
        	    <Elements>
        	        <StripeInput id="routingno" label="Routing Number" value={this.state.routingno} error={this.state.userErrors.routingno} onChange={this.onStripeChange} />
        	    </Elements>
					<div className="button-div">
						<Button value="Add Bank" id="submit" />
					</div>
        	</form>
        </div>
				<div id='user-notify'>
					<p className='success-msg'>{this.state.userNotify.success}</p>
					<p className='error-msg'>{this.state.userNotify.msg}</p>
				</div>
			</div>
		)
	}
}

export default injectStripe(AddACHOption)
