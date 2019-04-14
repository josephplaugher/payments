import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import LightBox from 'lightbox-appco'
import ValRules from 'Util/ValRules'
import CheckLoginState from 'Util/CheckLoginState'

class VerifyAmounts extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/verifyACH'
		this.valRules = ValRules
		this.extraData = { bankID: this.props.accountIDToVerify }
		this.rfa_headers = { csrf: sessionStorage.getItem(process.env.TOKEN_NAME) }
		this.state = {
			userNotify: {},
			userErrors: {},
			amount1: '',
			amount2: '',
			formData: { amount1: '', amount2: '' }
		}
	}

	response(res) {
		// renew the client side token after form submit
		CheckLoginState(res.headers.token)
		this.setState({ userNotify: res.data.userNotify })
		this.props.refreshSources()
	}

	render() {
		const displayAcctNo = `Account to Verify: ******${
			this.props.accountToVerify
		} `

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
				<div id='verify-bank'>
					<p className='text'>
						Enter the amount of the two deposits to verify your bank account
					</p>
					{/* prettier-ignore */}
					<form onSubmit={this.rfa_onSubmit} >
          <p className='text'>{displayAcctNo}</p>
            <Input name="amount1" label="Amount 1" value={this.state.amount1} error={this.state.userNotify.amount1} onChange={this.rfa_onChange} />
            <Input name="amount2" label="Amount 2" value={this.state.amount2} error={this.state.userNotify.amount2} onChange={this.rfa_onChange} /><br />
            <div className="button-div">
                <Button value="Verify Bank" id="submit" />
            </div>
        </form>
					<p className='text'>{this.props.needsValidatedMessage}</p>
					<p className='text'>{this.userNotify.success}</p>
				</div>
			</LightBox>
		)
	}
}

export default VerifyAmounts
