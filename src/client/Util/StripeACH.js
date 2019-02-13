import React from 'react';
import Input from './Input'

class StripeACH extends React.Component {

  render() {

      return (
        <div id="stripACHContainer">
        <Input label="Bank Account Number" value={this.props.acctno} error={this.props.userErrors.acctno} onChange={this.props.onChange} />
        <Input label="Routing Number" value={this.props.routingno} error={this.props.userErrors.routingno} onChange={this.props.onChange} /><br />
        </div>
      );
    }
  }  

export default injectStripe(StripeACH);