import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import CustValRules from './CustValRules'
import SetUrl from 'Util/SetUrl'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

class FindCustomers extends React.Component{

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
    }
  }

  render() {

    const columns = [
      { Header: 'Customer', accessor: 'name' },
      { Header: 'Contact Name', accessor: 'contact' }]

    return (
      <div id="workingPane">
      <EB comp="Form in FindCustomers" >
      <Form 
        formTitle="Find Customers" 
        action={`${SetUrl()}/people/findCustomers`}
        valrules={CustValRules}
        response={this.response}
        clearOnSubmit="false" >
        <Input name="id" label="ID" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="name" label="Name" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="contact" label="Cantact Name" className="textinput" labelClass="label" errorClass="input-error" />
        <Input name="phone" label="Phone" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="email" label="Email" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="street" label="Street" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="city" label="City" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="state" label="State" className="textinput" labelClass="label" errorClass="input-error"/>
        <Input name="zip" label="zip" className="textinput" labelClass="label" errorClass="input-error"/>
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        </div>
      </Form>
      </EB>
      <div id="resultField">
        <EB comp="ReactTable in SearchCustomers">
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
                <Form formTitle="Customer Details" clearOnSubmit="false" >
                <Input name="id" label="ID" prePopVal={this.state.id} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="name" label="Name" prePopVal={this.state.name} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="contact" label="Contact Person" prePopVal={this.state.contact} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="phone" label="Phone" prePopVal={this.state.phone} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="email" label="Email" prePopVal={this.state.email} className="textinput" labelClass="label" errorClass="input-error" /> 
                <Input name="street" label="Street" prePopVal={this.state.street} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="city" label="city" prePopVal={this.state.city} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="state" label="State" prePopVal={this.state.state} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="zip" label="Zip" prePopVal={this.state.zip} className="textinput" labelClass="label" errorClass="input-error" />
                </Form>
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

export default FindCustomers;