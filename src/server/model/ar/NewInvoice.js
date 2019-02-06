const Query = require('./../../util/Query');
const GenID  = require('./../../util/GenID');
const DebitCredit = require('./../accounting/DebitCredit');

function NewInvoice(req, res){
  this.req = req;
  this.inputs = req.body;
  this.res = res;
  this.lineTotal = [];
  this.invoiceTotal = '';
  this.invnum = '';
  this.inputs['empid'] = req.session.empid;
  this.inputs.revacctno = req.body.acctno;
  this.inputs.revacctname = req.body.acctname;
  this.today = new Date();
  this.error = {};
}

//all the other funtions are dispatched from this one
NewInvoice.prototype.enterNewInvoice = function() {
  //first we generate a new invoice number
  const Invnum = this.generateInvoiceNumber();
  Invnum.then( result => {
    this.inputs['invnum'] = result.rows[0].id;
    this.getARNo();
  }).catch( (error) => {
    this.setError(`Something went wrong, but we're working to fix it! Please try again.`);
    console.error('get invnum error: ', error);
  });
}

NewInvoice.prototype.generateInvoiceNumber = function () {
  return new Promise((resolve, reject) => {
    let ID = GenID('invoices_invnum_seq');
    ID.then((id) => {
      resolve(id);
    }).catch(error => console.error('get invoice number error: ', error))
  });
}

 //this is in case the user changes their numbering system. We want the correct number for AR
NewInvoice.prototype.getARNo = function() {
  const AR = new Query("SELECT acctno FROM sys_coa WHERE acctname = 'Accounts Receivable' ",[]);
  const number = AR.returnResult();
  number.then( (no) => { 
    this.inputs['aracctname'] = 'Accounts Receivable';
    this.inputs['aracctno'] = no.rows[0].acctno;
    this.continueNewInvoice();
  }).catch( (error) => {
    console.error('get ar no error: ', error)
  });
}

NewInvoice.prototype.continueNewInvoice = function() {
  console.log('create invoice starting');
  this.rowCheck();
  this.getLineTotals(); 
  this.invoiceHeader();
  let u = this.inputs;
  for(i = 0; i < this.inputs.item.length; i++ ) {
    this.invoiceLines(u.item[i],u.price[i], u.quant[i], u.line_total[i]);
  }
//set some input necessary for the journal entries
  this.inputs['cashyn'] = 'no';
  this.inputs['payee_payer_id'] = this.inputs.customerid;
  this.creditEntry();
  this.debitEntry();
  let msg = 'Invoice #' +this.inputs.invnum + ' entered successfully';
  console.log('inputs: ', this.inputs);
  this.res.status(200).json({ success: msg, userNotify: {}});
}

NewInvoice.prototype.rowCheck = function() {
  console.log('inputs: ', this.inputs);
  //if at least one row is entered and no incomplete rows are entered, do nothing, otherwise send error response.
  for(i = 0; i  < this.inputs.item.length; i++ ) {
    if(!this.inputs.item[i] || !this.inputs.price[i] || !this.inputs.quant[i] ) {
      this.res.status(200).json({ userNotify: {header: 'At least one row must be complete'}});
    }
  }
}

NewInvoice.prototype.getLineTotals = function() {
  this.inputs['line_total'] = [];
  for(i = 0; i  < this.inputs.item.length; i++ ) {
    this.inputs.line_total[i] = this.inputs.price[i] * this.inputs.quant[i];
  }
  //get an invoice total
  this.inputs['invoiceTotal'] = this.inputs.line_total.reduce(this.sumInvoice, 0);
}

NewInvoice.prototype.sumInvoice = function(a, b) {
  return a + b;
}

NewInvoice.prototype.invoiceHeader = function() {
  var i = this.inputs;
  const header = new Query(`INSERT INTO invoices 
    (date, invnum, invdate, description, invdue, total, 
    customerid, customer, acctname, acctno, status, header, empid) 
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,'t', $12)`, 
    [this.today,i.invnum,i.date,i.description,i.invdue,i.invoiceTotal,
    i.customerid, i.customer, i.aracctname, i.aracctno, 'unpaid', i.empid]);
  
  header.runInputQuery();
}

NewInvoice.prototype.invoiceLines = function(item, price, quant, line_total) {
  var i = this.inputs;
  const line = new Query(`INSERT INTO invoices 
    (date, invnum, invdate, customerid, customer,
    description, unit_price, quant, line_total) 
    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 )`, 
    [this.today, i.invnum, i.date, i.customerid, i.customer,
      item, price, quant, line_total]);
  line.runInputQuery();
}

NewInvoice.prototype.creditEntry = function() {
  console.log('credit');
  this.inputs['credit'] = this.inputs.invoiceTotal;
  this.inputs.acctno = this.inputs.revacctno;
  this.inputs.acctname = this.inputs.revacctname;
  const Credit = new DebitCredit(this.inputs);
  Credit.runCredit();

}

NewInvoice.prototype.debitEntry = function() {
  console.log('debit');
  this.inputs['debit'] = this.inputs.invoiceTotal;
  this.inputs.acctno = this.inputs.aracctno;
  this.inputs.acctname = this.inputs.aracctname;
  const Debit = new DebitCredit(this.inputs);
  Debit.runDebit();
}

module.exports = NewInvoice;