import React from 'react'
import { Button } from 'reactform-appco'

class BuildBankList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const list = this.props.bankList.map((item) => (
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
						this.props.payOrValidate(item)
					}}
					value={this.props.checkBankStatusValue(item.status)}
				/>
				<Button
					className='rfa_submit'
					onClick={this.props.delete}
					value='Delete This Bank'
				/>
			</div>
		))
		return { list }
	}
}

export default BuildBankList
