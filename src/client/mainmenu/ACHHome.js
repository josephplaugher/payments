import React from 'react'
import { Button } from 'reactform-appco'
import LightBox from 'lightbox-appco'
import ValRules from 'Util/ValRules'
import AddACHOption from './ach/AddACHOption'
import VerifyAmounts from './ach/VerifyAmounts'
import PayInvoice from './ach/PayInvoice'
import DeleteBank from './ach/DeleteBank'
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
			showDeleteBank: false,
			deleteBank: {},
			bankList: []
		}
		this.showAddNew = this.showAddNew.bind(this)
		this.checkBankStatusValue = this.checkBankStatusValue.bind(this)
		this.close = this.close.bind(this)
		this.deleteBank = this.deleteBank.bind(this)
	}

	componentDidMount() {
		const bankList = this.props.userData.sources.data
		console.log('sources: ', this.props.userData.sources)
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
					onClick={() => {
						this.payOrValidate(item)
					}}
					value={this.checkBankStatusValue(item.status)}
				/>
				<Button
					className='rfa_submit'
					onClick={() => {
						this.deleteBank(item)
					}}
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

	payOrValidate(source) {
		if (source.status === 'verified') {
			this.setState({
				showPayWindow: true,
				showVerifyWindow: false,
				payBank: source
			})
		} else {
			console.log('source last4: ', source.last4)
			this.setState({
				showVerifyWindow: true,
				showPayWindow: false,
				accountToVerify: source.last4,
				accountIDToVerify: source.id
			})
		}
	}

	showAddNew() {
		this.setState({ showAddNew: true })
	}

	deleteBank(item) {
		this.setState({ showDeleteBank: true, deleteBank: item })
	}

	close() {
		this.setState({
			showAddNew: false,
			showVerifyWindow: false,
			showPayWindow: false,
			showDeleteBank: false
		})
	}

	render() {
		const needsValidatedMessage = `We'll need to verify your
    bank account. We will send two small deposits to your account with
    description "AMNTS" which will take 1-2 business days to appear in
    your account. When you have those amounts, come back and enter them to
    verify your account. Then you can pay using ACH.`

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
						accountToVerify={this.state.accountToVerify}
						accountIDToVerify={this.state.accountIDToVerify}
						resfreshSources={this.props.refreshStripeSources}
						close={this.close}
					/>
				) : null}
				{this.state.showPayWindow ? (
					<PayInvoice payBank={this.state.payBank} close={this.close} />
				) : null}
				{this.state.showDeleteBank ? (
					<DeleteBank
						deleteBank={this.state.deleteBank}
						resfreshSources={this.props.refreshStripeSources}
						close={this.close}
					/>
				) : null}
			</div>
		)
	}
}

export default ACHHome
