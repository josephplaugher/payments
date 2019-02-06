import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import ReadOnlyInput from 'Util/ReadOnlyInput'
import Button from 'Util/Button'
import LightBox from 'Util/LightBox'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class COA extends FormClass {

  constructor(props) {
    super(props);
    this.useLiveSearch = false
    this.route = '/trans/editCOA'
    this.valRules = ValRules
    this.state = {
      dataView: false,
      table:[],
      formData: {
        acctno: '',
        acctname: '',
        description: ''
      },
      acctno: '',
      acctname: '',
      description: '',
      type: '',
      userNotify: ''
    }
    this.getCOA = this.getCOA.bind(this)
    this.response = this.response.bind(this)
    this.disableAcct = this.disableAcct.bind(this)
    this.enableAcct = this.enableAcct.bind(this)
    this.deleteAcct = this.deleteAcct.bind(this)
  }
  
  componentDidMount() {
     this.getCOA() 
  }

  getCOA = () => {
    Ajax.get(SetUrl() + "/trans/coa")
      .then(res => {
          this.setState({
            table: res.data.table
          })
      })
  }
  
  selectItem = (row) => {
    let formData = {
      acctno: row['acctno'], 
      acctname: row['acctname'], 
      description: row['descriptoin']
    }
    this.setState({ 
      dataView: true,
      formData: formData, 
      userNotify: ''});
    //place all the resulting data into state
    for(var key in row){
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
  }

  response = (res) => {
    this.setState({
      userNotify: res.data.userNotify,
      acctname: res.data.newValues.acctname,
      description: res.data.newValues.description
    })
    this.getCOA()
  }

  disableAcct = () => {
    Ajax.get(SetUrl() + "/trans/disableAcct/" + this.state.formData.acctno)
      .then(res => {
        this.getCOA()
        this.setState({status: 'disabled', userNotify: res.data.userNotify})
      })
  }

  enableAcct = () => {
    Ajax.get(SetUrl() + "/trans/enableAcct/" + this.state.formData.acctno)
      .then(res => {
        this.setState({status: 'Active', userNotify: res.data.userNotify})
        this.getCOA()
      })
  }

  deleteAcct = () => {
    Ajax.get(SetUrl() + "/trans/deleteAcct/" + this.state.formData.acctno)
      .then(res => {
        console.log(res.data.deleted)
        if(res.data.deleted === false) {
          this.setState({userNotify: res.data.userNotify})
        }else{
          this.closeLightBox()
          this.getCOA()
        }
      })
  }

    render() {
      const columns = [
        {Header: 'Account Name', accessor: 'acctname'},
        {Header: 'Account Number', accessor: 'acctno'},
        {Header: 'Description', accessor: 'description'},
        {Header: 'Type', accessor: 'type'}]

      return (
        <div id="workingPane">
          <p className="formTitle">Chart of Accounts</p>
            <div id="resultField">
            <EB comp="ReactTable in COA">
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
                <p className="formTitle">Account Details</p>
                <form onSubmit={this.onSubmit} >
                <ReadOnlyInput name="acctno" label="Account Number" value={this.state.acctno} />
                <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} />
                <Input name="description" label="Description" value={this.state.description} onChange={this.onChange} />
                <ReadOnlyInput name="type" label="Type" value={this.state.type} />
                <ReadOnlyInput name="status" label="Status" value={this.state.status} />
                <div className="buttondiv"><Button type="submit" value="Save Changes"/></div>
                </form>
                <div id="actions">
                {this.state.status === "disabled" ? (
                  <Button value="Enable Account" onClick={ () => this.enableAcct() } />
                ):(
                  <Button value="Disable Account" onClick={ () => this.disableAcct() } />
                )}
                <Button value="Delete Account" onClick={ () => this.deleteAcct() } />
                </div>
                <p className="errorMsg">{this.state.userNotify}</p>
              </LightBox>  
              </div>
            ):(
              null
            )}
            </div>
            
        </div>
      )
    }
}

export default COA;