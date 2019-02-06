import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <input className="submit" 
            type="submit" 
            name="submit"
            id={this.props.id} 
            value={this.props.value}
            onClick={this.props.onClick}
            />   
        )
    };
}

export default Button;