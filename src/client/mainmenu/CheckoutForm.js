import React from 'react'
import Input from 'Util/Input'
import StripeInput from 'Util/StripeInput'
import Button from 'Util/Button'
import Validate from 'Util/Validate'
import ValRules from 'Util/ValRules'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import {injectStripe} from 'react-stripe-elements';

import 'css/main.css'
import 'css/logo.css'
import 'css/form.css'

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props)
        this.useLiveSearch = false
        this.route = '/pay'
        this.valRules = ValRules
        this.state = {
            invoice: '',
            amount: '',
            creditCard: '',
            exp: '',
            CSV: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.response = this.response.bind(this)
    }

    onChange = (event) => {
        const id = event.target.id;
        this.setState({
            [id]: event.target.value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.stripe.createSource({type: 'card', owner: {
               name: 'Jenny Rosen'
             }});

        let data = {
            invoice: this.state.invoice,
            amount: this.state.amount
        }
        Ajax.post(SetUrl() + this.route, data)
            .then((res) => {
                this.response(res)
            })
    }

    response = (res) => {
        console.log(res)
    }

    render() {

        return (

            <form onSubmit={this.onSubmit} >
                <Input name="invoice" label="Invoice Number" value={this.state.invoice} onChange={this.onChange} /><br />
                <Input name="amount" label="Payment Amount" value={this.state.amount} onChange={this.onChange} /><br /><br />
                <StripeInput id="creditCard" label="Credit Card Number" value={this.state.creditCard} onChange={this.onChange} /><br />
                <StripeInput id="exp" label="Expiration Date" value={this.state.exp} onChange={this.onChange} /><br />
                <StripeInput id="CSV" label="CSV" value={this.state.CSV} onChange={this.onChange} />
                <div className="button-div">
                    <Button value="Pay Now" id="submit" />
                </div>
            </form>
        )
    }
}

export default injectStripe(CheckoutForm)
