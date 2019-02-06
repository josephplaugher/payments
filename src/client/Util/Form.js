import React from 'react';
import 'css/form.css'

class Form extends React.Component {

    render() {
        
        return (
            <div id="form-container">
                <p className="formTitle">{this.props.formTitle}</p>
                <form onSubmit={this.props.onSubmit}>
                {this.props.children} {/*there must be nested input components passed in*/}
                </form>
            </div>
        )
    };
}

export default Form;