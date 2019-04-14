import React from 'react'
import { FormClass, Button } from 'reactform-appco'
import LightBox from 'lightbox-appco'
import ValRules from 'Util/ValRules'
import CheckLoginState from 'Util/CheckLoginState'

class DeleteBank extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/deleteBank'
		this.valRules = ValRules
		this.extraData = {
			bankID: this.props.deleteBank.id
		}
		this.rfa_headers = { csrf: sessionStorage.getItem(process.env.TOKEN_NAME) }
		this.state = {
			userNotify: {},
			userErrors: {}
		}
	}

	response(res) {
		// renew the client side token after form submit
		CheckLoginState(res.headers.token)
		console.log('verify response: ', res)
		this.props.refreshSources()
		this.props.close()
	}

	render() {
		const displayAcctNo = `Delete account ******${this.props.deleteBank.last4} `

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
					<p className='text'>Once this account is deleted, if need to use it in the future you'll have to 
					verify the account again which can take several days. Are you sure you want to delete this account?</p>
					 <div className="button-div">
                <Button value="Delete this bank (cannot be undone)" id="submit" />
            </div>
        </form>
					<br />
					<div className='button-div'>
						<Button value='Cancel' onClick={this.props.close} />
					</div>
					<div id='user-notify'>
						<p className='success-msg'>{this.state.success}</p>
					</div>
				</div>
			</LightBox>
		)
	}
}

export default DeleteBank
