import FormClass from 'Util/FormClass'
import React from 'react'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class EnterWithdrawal extends FormClass{

  render() {

    this.route =  'EnterWithdrawal';
    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="Enter Withdrawal" onSubmit={this.onSubmit}  >
        <Input name="date" label="Date" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.date} />
        <Input name="docno" label="Document Number" value={this.state.value} onChange={this.onChange} error={this.state.error.docno}/>
        <Input name="decription" label="Description" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.description} />
        <Input name="amount" label="Amount" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.amount}/> 
        <Input name= "bankname" label="Bank Name" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.bankname}/>
        <Input name= "bankno" label="Bank Number" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.bankno}/>
        <Input name= "acctname" label="Account Name" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.acctname}/>
        <Input name= "acctno" label="Account Number" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.acctno}/>
        <Input name= "transtype" label="Transaction Type" value={this.state.value} onChange={this.onChange} error={this.state.userNotify.transtype}/>
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default EnterWithdrawal;