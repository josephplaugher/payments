import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import EB from 'Util/EB'
import CustValRules from './CustValRules'
import SetUrl from 'Util/SetUrl'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class EnterDeposit extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: {}
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
    if(res.success) {
      this.setState({userNotify: {success: res.userNotify.success}});
    }
    if(res.error) {
      this.setState({userNotify: {error: res.userNotify.error}});
    }
  }

  render() {

    return (
      <>
      <div id="userNotify">
        {this.state.userNotify.success}
      </div>
      <div id="workingPane">
      <Form formTitle="Enter Deposit"
        action={`${SetUrl()}/trans/EnterDeposit`} 
        valrules={CustValRules}
        response={this.response}  >
        <Input name="docdate" label="Document Date" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="docno" label="Document Number" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="decription" label="Description" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="amount" label="Amount" className="textinput" labelClass="label" errorClass="input-error"/> 
        <Input name="bankname" label="Bank Name" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="bankno" label="Bank Number" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="acctname" label="Account Name" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="acctno" label="Account Number" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="transtype" label="Transaction Type" className="textinput" labelClass="label" errorClass="input-error"/>
        <div className="buttondiv">
          <Button id="submit" value="Enter Deposit" />
        </div>
      </Form>
      </div>
      </>
    )
  }
}

export default EnterDeposit;