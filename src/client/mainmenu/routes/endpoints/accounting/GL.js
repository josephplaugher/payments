import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import ReadOnlyInput from 'Util/ReadOnlyInput'
import Button from 'Util/Button'
import LightBox from 'Util/LightBox'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'

class GL extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = true
    this.route = '/trans/gl'
    this.valRules = ValRules
    this.state = {
      dataView: false,
      userNotify: {},
      table: [],
      formData: {
        docstartdate: '',
        docenddate: '',
        ledgerstartdate: '',
        ledgerenddate: '',
        acctname: '',
        acctno: '',
        transid: ''
      },
      currentView: {},
      docdate: '',
      docstartdate: '',
      docenddate: '',
      ledgerdate: '',
      ledgerstartdate: '',
      ledgerenddate: '',
      acctname: '',
      acctno: '',
      transid: '',
      transtype: '',
      lsracctname: '',
      lsracctno: '',
    }
    this.response = this.response.bind(this)
  }

  selectItem = (row) => {
    //place all the resulting data for the clicked row into current view state
    var newView = {};
    for (var key in row) {
      //fill with new data select
      if(!row[key]) {
        newView[key] = '';
      } else {
        newView[key] = row[key]
      }
    }
      this.setState({
        currentView: newView,
        dataView: true, 
        userNotify: {}
      });
  }

  response = (res) => {
    console.log('res in res: ', res)
    this.setState({
      table: res.data.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
      this.setState({ userNotify: { error: res.error } })
    }
  }

  render() {

    const columns = [
      { Header: 'Trans Id', accessor: 'transid' },
      { Header: 'Document Date', accessor: 'docdate' },
      { Header: 'Ledger Date', accessor: 'ledgerdate' },
      { Header: 'Debit', accessor: 'debit' },
      { Header: 'Credit', accessor: 'credit' },
      { Header: 'Account Name', accessor: 'acctname' },
      { Header: 'Account Number', accessor: 'acctno' },
      { Header: 'Transaction Type', accessor: 'transtype' }]

    return (
      <>
        <div id="userNotify">{this.state.userNotify.error}</div>
        <div id="workingPane">
          <p className="formTitle">General Ledger</p>
          <form onSubmit={(event) => { this.onSubmit(event) }} >
            <Input name="docstartdate" label="Document Start Date" value={this.state.docstartdate} onChange={this.onChange} />
            <Input name="docenddate" label="Document End Date" value={this.state.docenddate} onChange={this.onChange} />
            <Input name="ledgerstartdate" label="Ledger Start Date" value={this.state.ledgerstartdate} onChange={this.onChange} />
            <Input name="ledgerenddate" label="Ledger End Date" value={this.state.ledgerenddate} onChange={this.onChange} /><br />
            <Input name="transid" label="Transaction ID" value={this.state.transid} onChange={this.onChange} />
            <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} lsr={this.state.lsracctname} />
            <Input name="acctno" label="Account Number" value={this.state.acctno} onChange={this.onChange} lsr={this.state.lsracctno} />
            <div className="buttondiv">
              <Button id="search" value="Search" />
            </div>
          </form><br />
          <div id="resultField">
            <EB comp="ReactTable in GL">
              <ReactTable
                filterable
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => { this.selectItem(rowInfo.original); }
                  }
                }
                }
                data={this.state.table}
                columns={columns}
              />
            </EB>
          </div>


          <div >
            {this.state.dataView ? (
              <div id="lightbox-container" className="lightbox-background">
                <LightBox close={this.closeLightBox} >
                <p className="formTitle">Transactions Details</p>
                  <form>
                    <ReadOnlyInput name="transid" label="Trans ID" value={this.state.currentView.transid} />
                    <ReadOnlyInput name="docdate" label="Document Date" value={this.state.currentView.docdate} />
                    <ReadOnlyInput name="ledgerdate" label="Ledger Date" value={this.state.currentView.ledgerdate} />
                    <ReadOnlyInput name="debit" label="Debit" value={this.state.currentView.debit} />
                    <ReadOnlyInput name="credit" label="Credit" value={this.state.currentView.credit} />
                    <ReadOnlyInput name="transtype" label="Transaction Type" value={this.state.currentView.transtype} />
                  </form>
                </LightBox>
              </div>
            ) : (
                null
              )}
          </div>
        </div>
      </>
    )
  }
}

export default GL;