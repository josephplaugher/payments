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

class ACH extends React.Component {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = "/pay";
    this.valRules = ValRules;
    this.state = {
      userErrors: {},
      email: "test@test.com",
      password: "test",
      invoice: "test",
      type: "individual",
      acctno: "000123456789",
      routingno: "110000000",
      amount: "500",
      chargeComplete: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onStripeChange = this.onStripeChange.bind(this);
    this.processACH = this.processACH.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.response = this.response.bind(this);
  }

  onChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  onStripeChange = event => {
    const id = event.target.id;
    this.setState({
      [id]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const data = {
      invoice: this.state.invoice,
      amount: this.state.amount,
      email: this.state.email,
      acctholder: this.state.acctholder
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
        this.setState({ invoiceData: data });
        this.processACH();
      }
    });
  };

  processACH() {
    let getToken = this.props.stripe.createToken("bank_account", {
      country: "US",
      currency: "usd",
      routing_number: this.state.routingno,
      account_number: this.state.acctno,
      account_holder_name: this.state.acctholder,
      account_holder_type: this.state.type
    });
    getToken.then(res => {
      if (typeof res.error !== "undefined") {
        console.log("stripe error: ", res.error);
        this.setState({
          userErrors: {
            stripeInputError: res.error
          }
        });
      } else {
        console.log("Received Stripe token:", res.token);
        let data = Object.assign(
          { token: res.token.id },
          this.state.invoiceData
        );
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
    const typeOptions = ["Individual", "Business"];

    return (
      <div id="form-container">
        {/* prettier-ignore */}
        <form onSubmit={this.onSubmit} >
            <Input name="invoice" label="Invoice Number" value={this.state.invoice} error={this.state.userErrors.invoice} onChange={this.onChange} />
            <Input name="amount" label="Payment Amount" value={this.state.amount} error={this.state.userErrors.amount} onChange={this.onChange} /><br />
            <Input name="email" label="Email" value={this.state.email} error={this.state.userErrors.email} onChange={this.onChange} />
            <Input name="password" label="Password" value={this.state.password} error={this.state.userErrors.password} onChange={this.onChange} /><br />
            <Elements>
                <StripeInput id="acctholder" label="Account Holder Name" value={this.state.acctholder} error={this.state.userErrors.acctholder} onChange={this.onStripeChange} />
            </Elements>
            <Elements>
                <Select id="type" label="Account Holder Type" options={typeOptions} value={this.state.type} onChange={this.onChange} />
            </Elements>
            <Elements>
                <StripeInput id="acctno" label="Bank Account Number" value={this.state.acctno} error={this.state.userErrors.acctno} onChange={this.onStripeChange} />
            </Elements>
            <Elements>
                <StripeInput id="routingno" label="Routing Number" value={this.state.routingno} error={this.state.userErrors.routingno} onChange={this.onStripeChange} />
            </Elements>
            <div className="button-div">
                <Button value="Pay Now" id="submit" />
            </div>
            <div id="user-notify">
                <p className="success-msg">{this.state.chargeComplete}</p>
            </div>
            <p className="text">If you haven't sent us funds via ACH before, we'll need to verify your bank account.
                We will send two small deposits to your account with description "AMNTS" which will take 1-2 business days to appear in your account.
                When you have those amount, come back and enter them to verify your account and you may then pay using ACH
                </p>
           
        </form>
      </div>
    );
  }
}

export default injectStripe(ACH);
