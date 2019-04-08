import React from 'react'
import { Button } from 'reactform-appco'
import AddACHOption from './AddACHOption'
import LightBox from 'lightbox-appco'
import ValRules from 'Util/ValRules'
import VerifyAmounts from './VerifyAmounts'
import { Elements } from 'react-stripe-elements'

import 'css/main.css'
import 'css/logo.css'
import 'css/form.css'
import 'css/ach.css'

class ACHHome extends React.Component {
	constructor(props) {
		super(props)
		this.valRules = ValRules
		this.state = {
			userNotify: {},
			userErrors: {},
			showAddNew: false,
			showVerifyWindow: false,
			showPayWindow: false,
			bankList: []
		}
		this.showAddNew = this.showAddNew.bind(this)
		this.checkBankStatusValue = this.checkBankStatusValue.bind(this)
		this.payOrValidate = this.payOrValidate.bind(this)
		this.close = this.close.bind(this)
	}

	componentDidMount() {
		const bankList = this.props.userData.sources.data
		console.log('source: ', bankList)
		const banks = bankList.map((item) => (
			<div className='ach-option' key={item.last4}>
				<p className='text'>{`Bank Name: ${item.bank_name} `}</p>
				<p className='text'>{`Account Holder Type: ${
					item.account_holder_type
				} `}</p>
				<p className='text'>{`Account Number (last 4): ${item.last4} `}</p>
				<p className='text'>{`Routing Number: ${item.routing_number} `}</p>
				<p className='text'>{`Status: ${item.status} `}</p>
				<Button
					className='rfa_submit'
					onClick={() => this.payOrValidate(item.status).bind(this)}
					value={this.checkBankStatusValue(item.status)}
				/>
				<Button
					className='rfa_submit'
					onClick={this.delete}
					value='Delete This Bank'
				/>
			</div>
		))
		this.setState({ bankList: banks })
	}

	checkBankStatusValue(status) {
		if (status === 'verified') {
			return 'Pay Invoice'
		} else {
			return 'Verify Account'
		}
	}

	payOrValidate(status) {
		if (status === 'verified') {
			this.setState({ showPayWindow: true, showVerifyWindow: false })
		} else {
			this.setState({ showVerifyWindow: true, showPayWindow: false })
		}
	}

	showAddNew() {
		this.setState({ showAddNew: true })
	}

	close() {
		this.setState({ showAddNew: false, showVerifyWindow: false })
	}

	render() {
		const needsValidatedMessage = `We'll need to verify your
    bank account. We will send two small deposits to your account with
    description "AMNTS" which will take 1-2 business days to appear in
    your account. When you have those amount, come back and enter them to
    verify your account and you may then pay using ACH`

		return (
			<div id='working-pane'>
				<p className='text'>Available banks</p>
				{this.state.bankList}
				<br />
				<Button
					className='rfa_submit'
					onClick={this.showAddNew}
					value='Add New Bank'
				/>
				{this.state.showAddNew ? (
					<>
						<LightBox
							close={this.close.bind(this)}
							style={{
								backgroundColor: 'white',
								borderColor: '#2665c4',
								borderRadius: '5px',
								borderStyle: 'solid',
								borderColor: '#2665c4',
								height: 'auto',
								width: '500px',
								left: '5'
							}}
						>
							<Elements>
								<AddACHOption
									userData={this.props.userData}
									needsValidatedMessage={needsValidatedMessage}
								/>
							</Elements>
						</LightBox>
					</>
				) : null}
				{this.state.showVerifyWindow ? (
					<VerifyAmounts
						needsValidatedMessage={needsValidatedMessage}
						close={this.close}
					/>
				) : null}
				{this.state.showPayWindow ? <p>put pay window here</p> : null}
			</div>
		)
	}
}

export default ACHHome