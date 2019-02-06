import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import IncomeStatement from './routes/endpoints/finstmts/IncomeStatement'
import BalanceSheet from './routes/endpoints/finstmts/BalanceSheet'
import CashFlow from './routes/endpoints/finstmts/CashFlow'
import 'css/routes.css'

const Statements = ({ match }) => (
    <div id="routes">
      <Link to={`${match.url}/income`} id="income" className="nav">
        Income Statement</Link>
        <Route path="/finstmts/income" component={IncomeStatement}/>
      <br/><Link to={`${match.url}/balanceSheet`} id="balanceSheet" className="nav">
        Balance Sheet</Link>
        <Route path="/finstmts/balanceSheet" component={BalanceSheet}/>
      <br/><Link to={`${match.url}/cashFlows`} id="cashFlows" className="nav">
        Statement of Cash Flows</Link>
        <Route path="/finstmts/cashFlows" component={CashFlow}/>
    </div>
  )

export default Statements;