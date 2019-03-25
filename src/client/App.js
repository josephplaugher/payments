import React from "react";
import SetUrl from "Util/SetUrl";
import ValRules from "Util/ValRules";
import EB from "Util/EB";
import checkLoginState from "Util/CheckLoginState";
import Home from "./mainmenu/Home";
import { StripeProvider } from "react-stripe-elements";

import "css/main.css";
import "css/userNotify.css";

class AppreciateCo extends React.Component {
  constructor(props) {
    super(props);
    this.stripeKey = "";
    this.state = {
      error: null,
      isLoggedIn: true,
      userData: {}
    };
    this.setLoginState = this.setLoginState.bind(this);
    this.response = this.response.bind(this);
    //this.setLoginState();
    this.setStripeKey = this.setStripeKey.bind(this);
    this.setStripeKey();
  }

  setLoginState = () => {
    const AppCoToken = sessionStorage.getItem("AppCoToken");
    //console.log('appco token', AppCoToken)
    if (AppCoToken !== null) {
      let auth = checkLoginState();
      auth.then(headers => {
        //console.log('headers, ', headers)
        if (typeof headers.token !== undefined) {
          let userData = JSON.parse(sessionStorage.getItem("AppCoUser"));
          sessionStorage.setItem("AppCoToken", headers.token);
          this.setState({
            isLoggedIn: true,
            userData: userData
          });
        } else {
          sessionStorage.removeItem("AppCoUser");
          sessionStorage.removeItem("AppCoToken");
          this.setState({
            isLoggedIn: false,
            userData: {}
          });
        }
      });
    }
  };

  response = res => {
    if (typeof res.userData !== "undefined") {
      sessionStorage.setItem("AppCoUser", JSON.stringify(res.userData));
      sessionStorage.setItem("AppCoToken", res.token);
      this.setState({
        token: res.token,
        userNotify: res.userNotify,
        userData: res.userData,
        isLoggedIn: true
      });
    }
    if (typeof res.error !== "undefined") {
      console.error("submit error: ", res.error);
    }
  };

  setStripeKey = () => {
    if (process.env.NODE_ENV === "production") {
      this.stripeKey = process.env.STRIPE_PUB_KEY;
    } else {
      this.stripeKey = process.env.STRIPE_TEST_KEY;
    }
  };

  render() {
    return (
      <div id="container">
        <div id="logoBox">
          <img src={SetUrl() + "/AppreciateLogo.png"} alt="Appreciate Logo" />
        </div>
        <div>
          {this.state.isLoggedIn ? (
            <EB comp="Home">
              <StripeProvider apiKey={this.stripeKey}>
                <Home />
              </StripeProvider>
            </EB>
          ) : (
            <div id="sign-in">
              {/* prettier-ignore */}
              <Form formTitle="Sign In" 
                  action={`${SetUrl()}/login`}
                  valrules={ValRules} response={this.response} >
                  <Input name="email" label="Email" className="textinput" labelClass="label" errorClass="input-error"/>
                  <Input name="password" label="Password" className="textinput" labelClass="label" errorClass="input-error"/>
                  <div className="buttondiv">
                    <Button id="submit" value="Sign In" />
                  </div>

                </Form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AppreciateCo;
