import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreditCard from "./CreditCard";
import ACH from "./ACH";
import { Elements } from "react-stripe-elements";

class Home extends React.Component {
  render() {
    return (
      <div id="home-container">
        <Router>
          {/* prettier-ignore */}
          <div id="nav-pane">        
          <Link to="/cc" className="nav">Credit Card</Link>
            <Route path="/cc" 
              render={(props) => <Elements><CreditCard {...props} method="CC"/></Elements>}
              />
          <br/><Link to="/ach" className="nav">ACH</Link>
            <Route path="/ach" 
              render={(props) => <Elements><ACH {...props} method="ACH"/></Elements>}
              />
        </div>
        </Router>
      </div>
    );
  }
}

export default Home;
