import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'

class Home extends React.Component {
 
  render() {

    return (
      <div id="home-container">
      <Router>
        <div id="nav-pane">
          <Link to="/cc" className="nav">Credit Card</Link>
            <Route path="/cc" 
              render={(props) => <CheckoutForm {...props} method="CC"/>}
              />
          <br/><Link to="/ach" className="nav">ACH</Link>
            <Route path="/ach" 
              render={(props) => <CheckoutForm {...props} method="ACH"/>}
              />
        </div>
      </Router>  
      </div>
    )
  }

}

export default Home;