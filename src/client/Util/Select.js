import React from 'react';
  
class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.options.map( option => 
      <option key={option} value={option}>{option}</option>
      );
    
      return (
        <div className="input-container">
        <p className="label">{this.props.label} </p>
        <p className='input-error'>{this.props.error} </p>
        <select className="textinput" 
          id={this.props.name} 
          name={this.props.name} 
          value={this.props.value}
          onChange={this.props.onChange}
          className="textinput"
        >
          {options}
        </select>
        </div>
      );
    }
  }  

export default Select;