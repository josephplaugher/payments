import React from 'react';
import {CardElement} from 'react-stripe-elements'
  
class StripeInput extends React.Component {

  render() {

      return (
        <div id="stripCCContainer">
        <p className="label">{this.props.label} </p>
        <p className='input-error'>{this.props.error} </p>
        <CardElement className="textinput"/>
        </div>
      );
    }
  }  

export default StripeInput;