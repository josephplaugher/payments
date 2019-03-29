import jwt from "jsonwebtoken";
//import loginConn from "../../../util/postgres.mjs";
import UserBase from "./UserBase.mjs";

class NewUser extends UserBase {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async checkUser() {
    let doesUserExist = this.getUserData();
    if (!doesUserExist) {
      this.createUser();
    }
  }

  createUser() {
    let i = this.req.body;
    const query = {
      text: `INSERT INTO users 
              (email, id, stripe_id, lname, fname, organization)
              VALUES
              ($1,$2,$3,$4,$5,$6)`,
      values: [
        i.email.toLowerCase(),
        i.id,
        i.stripe_id,
        i.lname,
        i.fname,
        i.organization
      ]
    };
    loginConn
      .query(query)
      .then(data => datresolvea)
      .catch(e => reject(e.stack));
  }
}

export default NewUser;
