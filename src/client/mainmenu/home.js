import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import {Elements} from 'react-stripe-elements'

class Home extends React.Component {
 
  render() {

    return (
      <div id="home-container">
      <div id="pay-container">
        <Elements>
          <CheckoutForm/>
        </Elements>
      </div>
      </div>
    )
  }

}

export default Home;