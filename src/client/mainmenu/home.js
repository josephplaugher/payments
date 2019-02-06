import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import StripeInput from 'Util/StripeInput'
import Button from 'Util/Button'
import Validate from 'Util/Validate'
import ValRules from 'Util/ValRules'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import {Elements} from 'react-stripe-elements'

import 'css/main.css'
import 'css/logo.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.useLiveSearch = false
    this.route = '/pay'
    this.valRules = ValRules
    this.state = {
      error: null
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

  onSubmit = (events) => {
    event.preventDefault()
    stripe.charges.create({
      amount: this.state.amount,
      currency: "usd",
      source: "tok_mastercard", // obtained with Stripe.js
      description: "test charge"
    }, (err, charge) => {
      if(err) { console.log('charge error: ', err)
      } else {
        console.log('the charge: ', charge)
      }
    })

    let data = {
      invoice:this.state.invoice,
      amount:this.state.amount 
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
      <div id="home-container">
      <div id="pay-container">
      <Elements>
        <form onSubmit={(event) => { this.onSubmit(event) }} >
              <Input name="invoice" label="Invoice Number" value={this.state.invoice} onChange={this.onChange} /><br/>
              <Input name="amount" label="Payment Amount" value={this.state.amount} onChange={this.onChange} /><br/><br/>
              <StripeInput id="CCN" label="Credit Card Number" value={this.state.creditCard} onChange={this.onChange} /><br/>
              <StripeInput id="exp" label="Expiration Date" value={this.state.exp} onChange={this.onChange} /><br/>
              <StripeInput id="CSV" label="CSV" value={this.state.CSV} onChange={this.onChange} />
              <div className="button-div">
                <Button value="Pay Now" id="submit" />
              </div>
        </form>
        </Elements>
      </div>
      </div>
    )
  }

}

export default Home;