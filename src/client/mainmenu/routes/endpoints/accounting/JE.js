import React, { Component } from 'react'
import axios from 'axios'

import 'css/workingPane.css'
import 'css/form.css'

class JE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      customerId: '',
      customerName: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
}

handleSubmit(event) {
  event.preventDefault();
  var formData = {
    name: this.state.name,
    id: this.state.id}
  axios.get('http://localhost:3004/je/' + formData.id,{responseType:'json'})
      .then((res) => {
              if(res.data.message){
                  this.setState({
                      customerName: res.data.message.name,
                      customerId: res.data.message.id
                  });
              }
              if(res.data.error){
                  console.log('error: '+ res.data.error);
                  };
      })     
}

  

    render() {
      return (
      <div id="workingPane">
        <h2>Journal Entry</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="id" placeholder="Customer ID" value={this.state.value} onChange={this.handleInputChange} autoComplete="off"/><br/>
          <input type="text" name="name" placeholder="Customer Name" value={this.state.value} onChange={this.handleInputChange} autoComplete="off"/><br/>
          <input type="submit" id="submit" value="Search" />
          </form>
          <div id="resultField">
            <p>Customer Name: {this.state.customerName}</p>
            <p>Customer ID: {this.state.customerId} </p>
          </div>
      </div>
      )
    }
}

export default JE;