import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import GlCoa from './routes/GlCoa'
import AR from './routes/AR'
import AP from './routes/AP'  
import 'css/routes.css'

const Accounting = ({ match }) => (
    <div id="routes">
      <Link to={`${match.url}/GlCoa`} id="gl-coa" className="nav">
        General Ledger and Chart of Accounts</Link>
        <Route path="/accounting/GlCoa" component={GlCoa}/>
      <br/><Link to={`${match.url}/ar`} id="ar" className="nav">
        Accounts Receivable</Link>
        <Route path="/accounting/ar" component={AR}/>
      <br/><Link to={`${match.url}/ap`} id="ap" className="nav">
        Accounts Payable</Link>
        <Route path="/accounting/ap" component={AP}/>
    </div>
  )

export default Accounting;