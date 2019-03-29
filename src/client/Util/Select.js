import React from "react";

class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ));

    return (
      <div className="rfa_input-container">
        <p className="rfa_label">{this.props.label} </p>
        <p className="rfa_input-error">{this.props.error} </p>
        <select
          className="rfa_textinput"
          id={this.props.name}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className="rfa_textinput"
        >
          {options}
        </select>
      </div>
    );
  }
}

export default Select;
