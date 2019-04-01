import React from "react";
import { Button } from "reactform-appco";
import AddACHOption from "./AddACHOption";
import LightBox from "lightbox-appco";
import ValRules from "Util/ValRules";
import { Elements } from "react-stripe-elements";

import "css/main.css";
import "css/logo.css";
import "css/form.css";
import "css/ach.css";

class ACHHome extends React.Component {
  constructor(props) {
    super(props);
    this.valRules = ValRules;
    this.state = {
      userNotify: {},
      userErrors: {},
      showAddNew: false,
      bankList: []
    };
    this.showAddNew = this.showAddNew.bind(this);
  }

  componentDidMount() {
    const bankList = this.props.userData.sources.data;
    const banks = bankList.map(item => (
      <div className="ach-option" key={item.last4}>
        <p className="text">{`Bank Name: ${item.bank_name} `}</p>
        <p className="text">{`Account Holder Type: ${
          item.account_holder_type
        } `}</p>
        <p className="text">{`Account Number (last 4): ${item.last4} `}</p>
        <p className="text">{`Routing Number: ${item.routing_number} `}</p>
        <Button className="rfa_submit" onClick={this.delete} value="Delete" />
      </div>
    ));
    this.setState({ bankList: banks });
  }

  showAddNew() {
    this.setState({ showAddNew: true });
  }

  close() {
    this.setState({ showAddNew: false });
  }

  render() {
    return (
      <div id="working-pane">
        <p className="text">Manage banks</p>
        {this.state.bankList}
        <Button
          className="rfa_submit"
          onClick={this.showAddNew}
          value="Add New Bank"
        />
        {this.state.showAddNew ? (
          <>
            <LightBox
              close={this.close.bind(this)}
              style={{
                backgroundColor: "white",
                borderColor: "#2665c4",
                borderRadius: "5px",
                borderStyle: "solid",
                borderColor: "#2665c4",
                height: "auto",
                width: "500px",
                left: "5"
              }}
            >
              <Elements>
                <AddACHOption userData={this.props.userData} />
              </Elements>
            </LightBox>
          </>
        ) : null}
      </div>
    );
  }
}

export default ACHHome;
