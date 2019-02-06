import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: {}
    }
  }

  selectItem = (row) => {
    //switch from data view to search view
    this.setState({ dataView: true, userNotify: {}});

    //place all the resulting data into state
    for(var key in row){
      //clear previous selection
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
  }

  closeLightBox = () => {
    this.setState({dataView: false});
  }

  response = (res) => {
    this.setState({
      table: res.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
      this.setState({userNotify: {error:res.error}})
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
        <Form formTitle="Statement of Cash Flows" 
              action={`${SetUrl()}/trans/gl`} 
              response={this.response}
              valrules={ValRules} 
              clearOnSubmit="false" >
          <Input name="docstartdate" label="Document Start Date" className="textinput" labelClass="label" errorClass="input-error"/>
          <Input name="docenddate" label="Document End Date" className="textinput" labelClass="label" errorClass="input-error"/>
          <Input name="ledgerstartdate" label="Ledger Start Date" className="textinput" labelClass="label" errorClass="input-error"/>
          <Input name="ledgerenddate" label="Ledger End Date" className="textinput" labelClass="label" errorClass="input-error"/><br/>
          <Input name="transid" label="Transaction ID" className="textinput" labelClass="label" errorClass="input-error"/>
          <Input name="acctname" label="Account Name" className="textinput" labelClass="label" errorClass="input-error"/>
          <Input name="acctno" label="Account Number" className="textinput" labelClass="label" errorClass="input-error"/>
          <div className="buttondiv">
            <Button id="search" value="Search" />
          </div>
        </Form><br/>
        <div id="resultField">
        <EB comp="ReactTable in GL">
            <ReactTable
              filterable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {this.selectItem(rowInfo.original);}
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
                <Form formTitle="Transactions Details" clearOnSubmit="false" >
                <Input name="transid" label="Trans ID" prePopVal={this.state.transid} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="docdate" label="Document Date" prePopVal={this.state.docdate} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="ledgerdate" label="Ledger Date" prePopVal={this.state.ledgerdate} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="debit" label="Debit" prePopVal={this.state.debit} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="credit" label="Credit" prePopVal={this.state.credit} className="textinput" labelClass="label" errorClass="input-error" /> 
                <Input name="transtype" label="Transaction Type" prePopVal={this.state.transtype} className="textinput" labelClass="label" errorClass="input-error" />
                </Form>
              </LightBox>  
              </div>
            ):(
              null
            )}
            </div>
      </div>
      </>
    )
  }
}

export default CashFlow;