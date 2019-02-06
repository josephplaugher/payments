import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/statement.css'

class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      userNotify: {},
      currentAssets: [],
      fixedAssets: [],
      currentAssetsTotal: '',
      fixedAssetsTotal: '',
      assetsTotal: '',
      currentLiabilities: [],
      longTermLiabilities: [],
      currentLiabilitiesTotal: '',
      longTermLiabilitiesTotal: '',
      liabilitiesTotal: '',
      equity: [],
      equityTotal: ''
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
      currentAssets: d.currentAssets,
      fixedAssets: d.fixedAssets,
      currentAssetsTotal: d.currentAssetsTotal,
      fixedAssetsTotal: d.fixedAssetsTotal,
      assetsTotal: d.assetsTotal,
      currentLiabilities: d.currentLiabilities,
      longTermLiabilities: d.longTermLiabilities,
      currentLiabilitiesTotal: d.currentLiabilitiesTotal,
      longTermLiabilitiesTotal: d.longTermLiabilitiesTotal,
      liabilitiesTotal: d.liabilitiesTotal,
      equity: d.equity,
      equityTotal: d.equityTotal
    });
    if (res.error) {
      console.error('submit error: ', res.error);
      this.setState({userNotify: res.userNotify})
    }
  }

  render() {
    const currentAssets = this.state.currentAssets.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.debitbal - item.creditbal).toFixed(2)}</div>
    </>
    );

    const fixedAssets = this.state.fixedAssets.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.debitbal - item.creditbal).toFixed(2)}</div>
    </>
    );

    const currentLiabilities = this.state.currentLiabilities.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.creditbal - item.debitbal).toFixed(2)}</div>
    </>
    );

    const longTermLiabilities = this.state.longTermLiabilities.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.creditbal - item.debitbal).toFixed(2)}</div>
    </>
    );

    const equity = this.state.equity.map( (item) => 
    <>
      <div className="acct-name" id={`${item.acctname}_${item.acctno}`}>{item.acctname}</div>
      <div className="acct-total">{parseFloat(item.creditbal - item.debitbal).toFixed(2)}</div>
    </>
    );

    return (
      <>
      <div id="userNotify">{this.state.userNotify.error}</div>
      <div id="workingPane">
        <Form formTitle="Income Statement" 
              action={`${SetUrl()}/stmts/balance`} 
              response={this.response}
              valrules={ValRules} 
              clearOnSubmit="false" >
          <Input name="date" label="Date" className="textinput" labelClass="label" errorClass="input-error"/>
          <br/>
          <div className="buttondiv">
            <Button id="search" value="Generate Statement" />
          </div>
        </Form><br/>
        <EB comp="Statement Field in Income Statement">
        <div id="statementField">
            <div className="header">Assets</div>
            <div className="header">Current Assets</div>
            <div className="statement-line">{currentAssets}</div>
            <div className="total-header">Total Current Assets</div><div className="subtotal">{this.state.currentAssetsTotal}</div>

            <div className="header">Fixed Assets</div>
            <div className="statement-line">{fixedAssets}</div>
            <div className="total-header">Total Fixed Assets</div><div className="subtotal">{this.state.fixedAssetsTotal}</div>

            <div className="total-header">Total Assets</div><div className="subtotal">{this.state.assetsTotal}</div>

            <div className="header">Current Liabilities</div>
            <div className="statement-line">{currentLiabilities}</div>
            <div className="total-header">Total Current Liabilities</div><div className="subtotal">{this.state.currentLiabilitiesTotal}</div>

            <div className="header">Long-Term Liabilities</div>
            <div className="statement-line">{longTermLiabilities}</div>
            <div className="total-header">Total Long-Term Liabilities</div><div className="subtotal">{this.state.longTermLiabilitiesTotal}</div>

            <div className="total-header">Total Liabilities</div><div className="subtotal">{this.state.liabilitiesTotal}</div>

            <div className="header">Equity</div>
            <div className="statement-line">{equity}</div>
            <div className="total-header">Total Equity</div><div className="subtotal">{this.state.equityTotal}</div>
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

export default BalanceSheet;