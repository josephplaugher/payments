import React, { Component } from "react";
import { Button } from "reactform-appco";
import "css/user.css";
import "css/form.css";

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const signed = `Current User: ${this.props.userData.lname}, ${
      this.props.userData.fname
    }`;

    return (
      <div id="user">
        <p className="text">{signed}</p>
        <Button
          id="sign out"
          className="submit"
          value="Sign Out"
          onClick={this.props.signOut}
        />
      </div>
    );
  }
}

export default User;
