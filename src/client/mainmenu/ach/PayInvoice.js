import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import LightBox from 'lightbox-appco'
import ValRules from 'Util/ValRules'
import CheckLoginState from 'Util/CheckLoginState'

class PayInvoice extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/payInvoiceViaACH'
		this.valRules = ValRules
		this.extraData = {
			bankID: this.props.payBank.id
		}
		this.rfa_headers = { csrf: sessionStorage.getItem(process.env.TOKEN_NAME) }
		this.state = {
			userNotify: {},
			userErrors: {},
			invoice: '',
			amount: '',
			formData: { invoice: '', amount: '' }
		}
	}

	response(res) {
		// renew the client side token after form submit
		CheckLoginState(res.headers.token)
		console.log('verify response: ', res)
	}

	render() {
		const displayAcctNo = `Pay using account ******${this.props.payBank.last4} `

		return (
			<LightBox
				close={this.props.close}
				style={{
					backgroundColor: 'white',
					borderColor: '#2665c4',
					borderRadius: '5px',
					borderStyle: 'solid',
					borderColor: '#2665c4',
					height: 'auto',
					width: '300px',
					left: '5'
				}}
			>
				<div id='pay-invoice'>
					{/* prettier-ignore */}
					<form onSubmit={this.rfa_onSubmit} >
          <p className='text'>{displayAcctNo}</p>
						<Input name="invoice" label="Invoice Number" value={this.state.invoice} error={this.state.userNotify.invoice} onChange={this.rfa_onChange} />
            <Input name="amount" label="Payment Amount" value={this.state.amount} error={this.state.userNotify	.amount} onChange={this.rfa_onChange} /><br />
            <div className="button-div">
                <Button value="Pay Now" id="submit" />
            </div>
            <div id="user-notify">
                <p className="success-msg">{this.state.chargeComplete}</p>
            </div>
        </form>
				</div>
			</LightBox>
		)
	}
}

export default PayInvoice
