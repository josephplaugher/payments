import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import FindBankTrans from './endpoints/banking/FindBankTrans'
import Reconcile from './endpoints/banking/Reconcile'
import 'css/subRoutes.css'

const Ledgers = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/FindBankTrans`} id="ledgers" className="nav">
        Bank Ledgers</Link>
        
      <br/><Link to={`${match.url}/Reconcile`} id="reconcile" className="nav">
        Reconcile Ledgers</Link> 
          
  <Route path="/banking/Ledgers/FindBankTrans" component={FindBankTrans}/>
  <Route path="/banking/Ledgers/Reconcile" component={Reconcile}/>    
</div>
  )

export default Ledgers;