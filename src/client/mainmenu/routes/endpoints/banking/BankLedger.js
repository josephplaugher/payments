import FormClass from 'Util/FormClass'
import Ajax from 'Util/Ajax'
import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Form from 'Util/Form'
import Input from 'Util/Input'
import Button from 'Util/Button'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class BankLedger extends FormClass {

  showSearch = () => {
    this.setState({ searchView: true});
  }

  //override the submitData function from parent class
  submitData = () => {
    console.log('submitting now...');
    Ajax.post("http://localhost:3004/"+ this.route + "/", this.state.formData)
    .then((res) => {
      if(res.data.table){
        this.setState({
            resultSet: res.data.table,
            userNotify: res.data.userNotify
          })
      }
    })
  }

  selectTransaction = (row) => {
    //switch from data view to search view
    this.setState({ searchView: false, userNotify: ''});
    console.log('click',row);

    //place all the resulting data into state
    this.clearPrev();
    for(var key in row){
      console.log(key,row[key]);
      //clear previous selection
    
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
  }

  //this functiond doesn't work. It doesnn't clear previous state. why not?
  clearPrev = () => {
    this.setState({
      deposit:'',
      withdrawal:'',
      description:'',
      transtype:''
    });
  }

  render() {

    this.route = 'findBankTrans';
    
    const columns = [
        {Header: 'Trans Id', accessor: 'transid'},
        {Header: 'Date', accessor: 'date'},
        {Header: 'Deposit', accessor: 'deposit'}, 
        {Header: 'Withdrawal', accessor: 'withdrawal'},
        {Header: 'Account Name', accessor: 'acctname'},
        {Header: 'Account Number', accessor: 'acctno'},
        {Header: 'Description', accessor: 'description'}]

    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
        
      <div id="searchPane">
        <Form formTitle="Search Transactions" onSubmit={this.onSubmit} >
        <Input name="bankname" label="Bank Name" value={this.state.bankname} onChange={this.onChange} lsr={this.state.lsrbankname} error={this.state.userNotify.bankname}/>
        <Input name="bankno" label="Bank Number" value={this.state.bankno} onChange={this.onChange} lsr={this.state.lsrbankno} error={this.state.userNotify.bankno}/>  
        <Input name="startdate" label="Start Date" value={this.state.startdate} onChange={this.onChange} error={this.state.userNotify.startdate}/>
        <Input name="enddate" label="End Date" value={this.state.enddate} onChange={this.onChange} error={this.state.userNotify.enddate}/>
        <div className="buttondiv">
        <Button id="search" value="Search" />
        </div>
        </Form><br/>
      </div>    
      
        <div id="searchResultPane">
          <ReactTable
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {this.selectTransaction(rowInfo.original);}
              }
              }
            }
            data={this.state.resultSet}
            columns={columns}
          />
        </div>
      </div>
      </div>
    )
  }
}

export default BankLedger;