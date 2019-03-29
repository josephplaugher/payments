import React from "react";

class StripeInput extends React.Component {
  render() {
    return (
      <div className="rfa_input-container">
        <p className="rfa_label">{this.props.label} </p>
        <p className="rfa_input-error">{this.props.error} </p>
        <input
          className="rfa_textinput"
          type="text"
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onChange}
          autoComplete="off"
          className="rfa_textinput"
        />
      </div>
    );
  }
}

export default StripeInput;
