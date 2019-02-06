import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/statement.css'

class IncomeStatement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      userNotify: {},
      revenue: [],
      expense: [],
      revenueTotal: '',
      expenseTotal: '',
      profit: ''
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
    let d = res.statementData;
    this.setState({
      revenue: d.revenue,
      expense: d.expense,
      revenueTotal: d.revenueTotal,
      expenseTotal: d.expenseTotal,
      profit: d.profit
    });
    if (res.error) {
      console.error('submit error: ', res.error);
      this.setState({userNotify: res.userNotify})
    }
  }

  render() {
    const revenue = this.state.revenue.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.creditbal - item.debitbal).toFixed(2)}</div>
    </>
    );

    const expense = this.state.expense.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.debitbal - item.creditbal).toFixed(2)}</div>
    </>
    );

    return (
      <>
      <div id="userNotify">{this.state.userNotify.error}</div>
      <div id="workingPane">
        <Form formTitle="Income Statement" 
              action={`${SetUrl()}/stmts/income`} 
              response={this.response}
              valrules={ValRules} 
              clearOnSubmit="false" >
          <Input name="startdate" label="Start Date" className="textinput" labelClass="label" errorClass="input-error"/>
          <Input name="enddate" label="End Date" className="textinput" labelClass="label" errorClass="input-error"/>
          <br/>
          <div className="buttondiv">
            <Button id="search" value="Generate Statement" />
          </div>
        </Form><br/>
        <EB comp="Statement Field in Income Statement">
        <div id="statementField">
            <div className="header">Income</div>
            <div className="statement-line">{revenue}</div>
            <div className="total-header">Total Income</div><div className="subtotal">{this.state.revenueTotal}</div>

            <div className="header">Expense</div>
            <div className="statement-line">{expense}</div>
            <div className="total-header">Total Expense</div><div className="subtotal">{this.state.expenseTotal}</div>

            <div className="total-header">Net Income</div><div className="subtotal">{this.state.profit}</div>
        </div>
       </EB>

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

export default IncomeStatement;