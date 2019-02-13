import React from 'react';
import {CardElement} from 'react-stripe-elements'
import {injectStripe} from 'react-stripe-elements'

class StripeCC extends React.Component {

  render() {

      return (
        <div id="stripCCContainer">
        <p className="label">{this.props.label} </p>
        <p className='input-error'>{this.props.error} </p>
        <CardElement className="stripecctextinput"/>
        </div>
      );
    }
  }  

export default injectStripe(StripeCC);