import React from 'react';
import Input from './Input'

class InvoiceLines extends React.Component {

  render() {

      return (
        <div id="invoicelines">
        <Input name="item[]" label="Item" value={this.props.item} onChange={this.onChange} lsr={this.props.item} />
        <Input name="prie[]" label="Price" value={this.props.price} onChange={this.onChange} lsr={this.props.price} />
        <Input name="quant[]" label="Quantity" value={this.props.quantity} onChange={this.onChange} lsr={this.props.quanity} />
        </div>
      );
    }
  }  

export default InvoiceLines;