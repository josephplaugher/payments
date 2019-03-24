import React from "react";
import { FormClass, Input, Button } from "reactform-appco";
import LightBox from "lightbox-appco";

class VerifyAmounts extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.state = {
      userNotify: {},
      userErrors: {},
      amount1: "",
      amount2: ""
    };
  }

  render() {
    return (
      <LightBox
        close={this.props.close}
        style={{
          backgroundColor: "white",
          borderColor: "#2665c4",
          borderRadius: "5px",
          borderStyle: "solid",
          borderColor: "#2665c4",
          height: "auto",
          width: "250px",
          left: "5"
        }}
      >
        <div id="verify-bank">
          <p className="text">
            Enter the amount of the two deposits to verify your bank account
          </p>
          {/* prettier-ignore */}
          <form onSubmit={this.onSubmit} >
            <Input name="amount1" label="Amount 1" value={this.state.amount1} error={this.state.userErrors.amount1} onChange={this.onChange} />
            <Input name="amount2" label="Amount 2" value={this.state.amount2} error={this.state.userErrors.amount2} onChange={this.onChange} /><br />
            <div className="button-div">
                <Button value="Verify Bank" id="submit" />
            </div>
        </form>
          <p className="text">{this.props.needsValidatedMessage}</p>
        </div>
      </LightBox>
    );
  }
}

export default VerifyAmounts;
