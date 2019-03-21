import React from "react";
import Input from "Util/Input";
import Select from "Util/Select";
import StripeInput from "Util/StripeInput";
import StripeCC from "Util/StripeCC";
import Button from "Util/Button";
import Validate from "Util/Validate";
import ValRules from "Util/ValRules";
import Ajax from "Util/Ajax";
import SetUrl from "Util/SetUrl";
import { Elements, injectStripe } from "react-stripe-elements";

import "css/main.css";
import "css/logo.css";
import "css/form.css";

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = "/pay";
    this.valRules = ValRules;
    this.state = {
      userErrors: {},
      invoice: "test",
      amount: "500",
      chargeComplete: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.processCreditCard = this.processCreditCard.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.response = this.response.bind(this);
  }

  onChange = event => {
    const id = event.target.id;
    this.setState({
      [id]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const data = {
      invoice: this.state.invoice,
      amount: this.state.amount
    };
    let val = new Validate(data, this.valRules);
    let prom = val.isError();
    prom.then(error => {
      if (error.hasError) {
        // if there a problem with the invoice number or amount, stop the flow
        this.setState({
          userNotify: error
        });
      } else {
        // after the invoice number and amount are validated
        // create the token
        this.processCreditCard();
      }
    });
  };

  processCreditCard() {
    console.log(
      "acctno: ",
      this.state.acctno,
      "routing: ",
      this.state.routingno
    );
    this.props.stripe
      .createToken("bank_account", {
        country: "US",
        currency: "usd",
        routing_number: this.state.routingno,
        account_number: this.state.acctno,
        account_holder_name: this.state.acctholder,
        account_holder_type: this.state.type
      })
      .then(token => {
        if (token.error) {
          console.log("stripe error: ", token.error);
          this.setState({
            userErrors: {
              stripeInputError: error.message
            }
          });
        }
        if (typeof token.error === "undefined") {
          console.log("Received Stripe token:", token);
          data.token = token;
          //send the token to the server using the correct route for this payment method
          this.sendToken(data, "/ach");
        }
      });
  }

  sendToken = (data, route) => {
    console.log("the data: ", data);
    Ajax.post(SetUrl() + route, data).then(res => {
      this.response(res);
    });
  };

  response = res => {
    this.setState({ userNotify: res.data.msg });
    console.log(res);
  };

  render() {
    return (
      <div id="form-container">
        {/* prettier-ignore */}
        <form onSubmit={this.onSubmit} >
            <Input name="invoice" label="Invoice Number" value={this.state.invoice} error={this.state.userErrors.invoice} onChange={this.onChange} />
            <Input name="amount" label="Payment Amount" value={this.state.amount} error={this.state.userErrors.amount} onChange={this.onChange} /><br />
            <Elements>
                <StripeCC label="Credit Card" error={this.state.userErrors.stripeInputError} />
            </Elements>
            <div className="button-div">
                <Button value="Pay Now" id="submit" />
            </div>
            <div id="user-notify">
                <p className="success-msg">{this.state.chargeComplete}</p>
            </div>
        </form>
      </div>
    );
  }
}

export default injectStripe(CreditCard);
