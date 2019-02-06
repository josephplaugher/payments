const DebitCredit = require('./../accounting/DebitCredit');
const BaseObject = require('./../../util/BaseObject');

function NewDeposit(req, res) {
  BaseObject.apply(this, arguments);
  this.inputs = req.body;
  this.res = res;
}

NewDeposit.prototype = BaseObject.prototype;
NewDeposit.prototype.constructor = BaseObject;

NewDeposit.prototype.preprocess = function() {
  this.inputs['transtype'] = 'deposit';
  this.inputs['credit'] = this.inputs['debit'] = this.inputs.amount;
  this.inputs['payee_payer_id'] = this.inputs.customerid;
  this.inputs['cashyn'] = 'yes';
  Promise.all([this.creditEntry(), this.debitEntry()])
    .then( result => {
    this.respond(this.res, '', true, {success:'Deposit entered successfully.'});
  }).catch( error => {
    //log it to the system
    console.log(error);
    this.respond(this.res, '', false, {error:'Something went wrong. Please try again.'});
  })
  }

NewDeposit.prototype.creditEntry = function () {
  console.log('the inputs', this.inputs);
  const Credit = new DebitCredit(this.inputs);
  return new Promise((resolve, reject) => {
    var cred = Credit.runCredit()
    cred.then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    });
  });
}

NewDeposit.prototype.debitEntry = function () {
  console.log('the inputs', this.inputs);
  this.inputs.acctname = this.inputs.bankname;
  this.inputs.acctno = this.inputs.bankno;

  const Debit = new DebitCredit(this.inputs);
  return new Promise((resolve,reject) => {
    var deb = Debit.runDebit()
    deb.then(result => {
      resolve(result);
    }).catch(error => {
      reject(error);
    });
  });
}

module.exports = NewDeposit;