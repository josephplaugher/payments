import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import 'css/main.css'
import 'css/logo.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  render() {
    //const userData = this.props.userData;
    return (
      <div id="home-container">
      {/*}
        <Router>
        <div id="nav-pane">
        
          <Link to="/accounting" id="accounting" className="nav">Accounting</Link>
            <Route path="/accounting" component={Accounting}/>
          <br/><Link to="/banking" id="banking" className="nav">Banking</Link>
            <Route path="/banking" component={Banking}/>
          <br/><Link to="/finstmts" id="finstmts" className="nav">Financial Statements</Link>
            <Route path="/finstmts" component={Statements}/>
    
        </div>
        </Router>  
        */}
      </div>
    )
  }

}

export default Home;