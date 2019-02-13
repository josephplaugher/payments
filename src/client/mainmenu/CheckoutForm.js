import React from 'react'
import Input from 'Util/Input'
import StripeCC from 'Util/StripeCC'
import Button from 'Util/Button'
import Validate from 'Util/Validate'
import ValRules from 'Util/ValRules'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import {Elements} from 'react-stripe-elements'

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
            userErrors: {},
            invoice: 'test',
            amount: '500',
            chargeComplete: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.sendToken = this.sendToken.bind(this)
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
        const data = {
            invoice: this.state.invoice,
            amount: this.state.amount
        }
        let val = new Validate(data, this.valRules);
        let prom = val.isError();
        prom.then( (error) => {
        if(error.hasError){ 
            // if there a problem with the invoice number or amount, stop the flow
          this.setState({
            userNotify: error,
          })
        } else {
            // after the invoice number and amount are validated
            // create the token
            this.props.stripe.createToken({
                type: 'card', name: 'Jenny Rosen'
            })
            .then( token => {
                if(token.error) {
                    console.log('stripe error: ', token.error)
                    this.setState({
                        userErrors:{
                            stripeInputError: error.message
                            }
                        })
                }
                if(typeof token.error === 'undefined') {
                    console.log('Received Stripe token:', token)   
                    this.sendToken(token, data)            
                }
            })
        }
        })
    }

    sendToken = (token, data) => {
        data.token = token
        console.log('the data: ', data)
        Ajax.post(SetUrl() + this.route, data)
            .then((res) => {
                this.response(res)
            })
    }

    response = (res) => {
        this.setState({chargeComplete: 'Payment Complete, Thank You!'})
        console.log(res)
    }

    render() {

        return (
            <div id="form-container">            
            <form onSubmit={this.onSubmit} >
                
                {this.props.method === "CC" ? 
                <>
                <Input name="invoice" label="Invoice Number" value={this.state.invoice} error={this.state.userErrors.invoice} onChange={this.onChange} />
                <Input name="amount" label="Payment Amount" value={this.state.amount} error={this.state.userErrors.amount} onChange={this.onChange} /><br/>
                <Elements>
                <StripeCC label="Credit Card" error={this.state.userErrors.stripeInputError}/>
                </Elements>
                </>
                : (null)}
                
                {this.props.method === "ACH" ? 
                <>
                <Input name="invoice" label="Invoice Number" value={this.state.invoice} error={this.state.userErrors.invoice} onChange={this.onChange} />
                <Input name="amount" label="Payment Amount" value={this.state.amount} error={this.state.userErrors.amount} onChange={this.onChange} /><br/>
                <Elements>
                <h>ACH</h>
                </Elements>
                {/*<StripeCC label="Credit Card" error={this.state.userErrors.stripeInputError}/>*/}
                </>
                : (null)}
               
                <div className="button-div">
                    <Button value="Pay Now" id="submit" />
                </div>
                <div id="user-notify">
                    <p className="success-msg">{this.state.chargeComplete}</p>
                </div>
            </form>
            </div>
        )
    }
}

export default CheckoutForm
