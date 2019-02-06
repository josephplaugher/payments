import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import EnterInvoice from './endpoints/ap/enterSupplierInvoice'
import FindAPInvoices from './endpoints/ap/FindAPInvoices'
import FindSuppliers from './endpoints/ap/FindSuppliers'

import 'css/subRoutes.css'

const AP = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/enterInvoice`} id="enterInvoice" className="nav">
        Enter Invoice</Link>
      <br/><Link to={`${match.url}/findAPInvoices`} id="findAPInvoices" className="nav">
        Find Invoices</Link>
      <br/><Link to={`${match.url}/findSuppliers`} id="findSuppliers" className="nav">
        Find Suppliers</Link>

    <Route path="/accounting/ap/enterInvoice" component={EnterInvoice}/>
    <Route path="/accounting/ap/findAPInvoices" component={FindAPInvoices}/>
    <Route path="/accounting/ap/findSuppliers" component={FindSuppliers}/>

    </div>
  )

export default AP;