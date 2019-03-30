//import loginConn from "../../../util/postgres.mjs";
import SetStripeKey from "./../SetStripeKey";

class UserBase {
  constructor(req, res) {
    this.stripe = SetStripeKey();
    this.req = req;
    this.res = res;
  }

  getCustomersByEmail() {
    let customer = new Promise((resolve, reject) => {
      var self = this;
      this.stripe.customers.list(
        { email: this.req.body.email },
        (error, customers) => {
          if (error) {
            reject(error);
          } else {
            resolve(customers);
          }
        }
      );
    });
    return customer;
  }

  // getUserData() {
  //   console.log("login con in userbase", loginConn);
  //   return new Promise((resolve, reject) => {
  //     const query = {
  //       text: `SELECT
  //               email, id, stripe_id, lname, fname, organization
  //           FROM users
  //           WHERE email = $1 `,
  //       values: [this.req.body.email.toLowerCase()]
  //     };
  //     loginConn
  //       .query(query)
  //       .then(data => {
  //         resolve(data);
  //       })
  //       .catch(e => reject(e.stack));
  //   });
  // }

  // setCookieAndToken(req, res, next) {
  //   var token = sign({ userData: userData }, process.env.JWT_SECRET, {
  //     expiresIn: "1h"
  //   });
  //   res.cookie(
  //     process.env.COOKIE_NAME,
  //     { token: token },
  //     {
  //       expires: new Date(Date.now() + 60 * 60 * 1000),
  //       maxAge: 60 * 60 * 1000,
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === true
  //     }
  //   );
  //   res.status(200).json({ userNotify: {}, userData: userData, token, token });
  // }
}

export default UserBase;
