import DataViewClass from 'Util/DataViewClass'
import React from 'react'
import ReactTable from 'react-table'
import LightBox from 'Util/LightBox'
import 'react-table/react-table.css'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class FindBankTrans extends DataViewClass {

  selectItem = (row) => {
    console.log('select item');
    //switch from data view to search view
    this.setState({ dataView: true });
    console.log('click', row);

    //fill with new data selected
    for (var key in row) {
      console.log(key, row[key]);
      this.setState({
        [key]: row[key]
      });
    }
  }

  closeLightBox = () => {
    console.log('close');
    this.setState({ dataView: false });
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
      { this.state.dataView ? (
       <div id="lightbox-container" className="lightbox-background">
        <LightBox close={this.closeLightBox} >
        <Form formTitle="Transaction Details" onSubmit={this.onSubmit}  >
          <Input name="date" label="Date" value={this.state.date} onChange={this.onChange} error={this.state.userNotify.date} />
          <Input name="docno" label="Document Number" value={this.state.docno} onChange={this.onChange} error={this.state.userNotify.docno}/>
          <Input name="decription" label="Description" value={this.state.description} onChange={this.onChange} error={this.state.userNotify.description} />
          <Input name="deposit" label="Deposit" value={this.state.deposit} onChange={this.onChange} error={this.state.userNotify.deposit}/> 
          <Input name="withdrawal" label="Withdrawal" value={this.state.withdrawal} onChange={this.onChange} error={this.state.userNotify.withdrawal}/> 
          <Input name="bankname" label="Bank Name" value={this.state.bankname} onChange={this.onChange} lsr={this.state.lsrbankname} error={this.state.userNotify.bankname}/>
          <Input name="bankno" label="Bank Number" value={this.state.bankno} onChange={this.onChange} lsr={this.state.lsrbankno} error={this.state.userNotify.bankno}/>
          <Input name="acctname" label="COA Account Name" value={this.state.acctname} onChange={this.onChange} onBlur={this.onFocusOut} lsr={this.state.lsracctname} error={this.state.userNotify.acctname}/>
          <Input name="acctno" label="COA Account Number" value={this.state.acctno} onChange={this.onChange} lsr={this.state.lsracctno} error={this.state.userNotify.acctno}/>
          <Input name="transtype" label="Transaction Type" value={this.state.transtype} onChange={this.onChange} error={this.state.userNotify.transtype}/>
          <div className="buttondiv">
          <Button id="submit" value="Button" />
          </div>
        </Form>
        </LightBox>  
        </div>
        ):( 
          null
        )}
    
        <div id="searchResultPane">
          <ReactTable
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {this.selectItem(rowInfo.original);}
              }
              }
            }
            data={this.state.success}
            columns={columns}
          />
        </div>
      </div>
      </div>
    )
  }
}

export default FindBankTrans;