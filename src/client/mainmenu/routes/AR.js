import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import FindInvoices from './endpoints/ar/FindInvoices'
import CreateInvoice from './endpoints/ar/CreateInvoice'
import FindCustomers from './endpoints/ar/FindCustomers'

import 'css/subRoutes.css'

const AR = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/createInvoice`} id="createInvoice" className="nav">
        Create Invoice</Link>
      <br/><Link to={`${match.url}/findInvoices`} id="findInvoices" className="nav">
        Find Invoices</Link>
      <br/><Link to={`${match.url}/findCustomers`} id="findCustomers" className="nav">
        Find Customers</Link>

    <Route path="/accounting/ar/findInvoices" component={FindInvoices}/>
    <Route path="/accounting/ar/createInvoice" component={CreateInvoice}/>
    <Route path="/accounting/ar/findCustomers" component={FindCustomers}/>

    </div>
  )

export default AR;