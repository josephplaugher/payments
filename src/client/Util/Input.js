import React from 'react';
  
class Input extends React.Component {

  render() {
    
    //make the password field type "password" so its contents are hidden
    let type;
    if(this.props.name === 'password'){
      type = 'password';
    }else{
      type = '"text"';
    }
    let lsr = 'lsr' + this.props.name;

      return (
        <div className="input-container">
        <p className="label">{this.props.label} </p>
        <p className='input-error'>{this.props.error} </p>
        <input className="textinput" 
          type= {type}
          id= {this.props.name} 
          name= {this.props.name} 
          value= {this.props.value}
          onChange={this.props.onChange}
          autoComplete="off"
          className="textinput"
        />
        {this.props.lsr ? (
          <div id={lsr} className="search-result">{this.props.lsr}</div>
          ) : ( 
          null
          )}
        </div>
      );
    }
  }  

export default Input;