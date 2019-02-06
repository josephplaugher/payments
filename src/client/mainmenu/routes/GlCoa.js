import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import GL from './endpoints/accounting/GL'
import COA from './endpoints/accounting/COA'
import JE from './endpoints/accounting/JE'
import 'css/subRoutes.css'

const GlCoa = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/gl`} id="generalLedger" className="nav">
        General Ledger</Link><br/>
      <Link to={`${match.url}/coa`} id="chartOfAccounts" className="nav">
        Chart of Accounts</Link><br/>
      <Link to={`${match.url}/je`} id="journalEntry" className="nav">
        Journal Entry</Link><br/>

    <Route path="/accounting/GlCoa/gl" component={GL}/>
    <Route path="/accounting/GlCoa/coa" component={COA}/>
    <Route path="/accounting/GlCoa/je" component={JE}/>

    </div>
  )

export default GlCoa;