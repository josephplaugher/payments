import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import DepositsWithdrawals from './routes/DepositsWithdrawals'
import Ledgers from './routes/Ledgers';
import 'css/routes.css'

const Banking = ({ match }) => (
    <div id="routes">
      <Link to={`${match.url}/DepositsWithdrawals`} id="deposits" className="nav">
        Deposits and Withdrawals</Link>
        <Route path="/banking/DepositsWithdrawals" component={DepositsWithdrawals}/>

      <br /><Link to={`${match.url}/Ledgers`} id="ledgers" className="nav">
        Ledgers and Reconciliations</Link>
        <Route path="/banking/Ledgers" component={Ledgers}/>  
    </div>
  )

export default Banking;