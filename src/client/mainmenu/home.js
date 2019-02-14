import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import { Elements } from 'react-stripe-elements'

class Home extends React.Component {
 
  render() {

    return (
      <div id="home-container">
      <Router>
        <div id="nav-pane">        
          <Link to="/cc" className="nav">Credit Card</Link>
            <Route path="/cc" 
              render={(props) => <Elements><CheckoutForm {...props} method="CC"/></Elements>}
              />
          <br/><Link to="/ach" className="nav">ACH</Link>
            <Route path="/ach" 
              render={(props) => <Elements><CheckoutForm {...props} method="ACH"/></Elements>}
              />
        </div>
      </Router>  
      </div>
    )
  }

}

export default Home;