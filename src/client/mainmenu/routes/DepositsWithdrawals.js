import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import EnterDeposit from './endpoints/banking/EnterDeposit'
import EnterWithdrawal from './endpoints/banking/EnterWithdrawal'
import FindBankTrans from './endpoints/banking/FindBankTrans'
import 'css/subRoutes.css'

const DepositsWithdrawals = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/enterDeposit`} id="enterDeposit" className="nav">
        Enter Deposit</Link>
        
      <br/><Link to={`${match.url}/enterWithdrawal`} id="enterWithdrawal" className="nav">
        Enter Withdrawal</Link>
        
      <br/><Link to={`${match.url}/findBankTrans`} id="findBankTrans" className="nav">
        Find Bank Transactions</Link>  
          
  <Route path="/banking/DepositsWithdrawals/enterDeposit" component={EnterDeposit}/>
  <Route path="/banking/DepositsWithdrawals/enterWithdrawal" component={EnterWithdrawal}/>
  <Route path="/banking/DepositsWithdrawals/findBankTrans" component={FindBankTrans}/>    
</div>
  )

export default DepositsWithdrawals;