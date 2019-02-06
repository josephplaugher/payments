const Query = require('./../../util/Query');

function DebitCredit(inputs) {
    this.inputs = inputs;
    this.today = new Date();
}

//run this method if we're doing a standard journal entry
DebitCredit.prototype.journNum = function () {
    return new Promise((resolve, reject) => {
        let ID = GenID('journ_num');
        ID.then((id) => {
            resolve(this.inputs['journ_num'] = id);
        }).catch(error => console.error('get je number error: ', error))
    });
}

DebitCredit.prototype.runDebit = function () {
    var i = this.inputs;
    console.log('the inputs', i);
    var Debit = new Query(`INSERT INTO sys_gl 
            (journ_num, transtype, docdate, time, description, 
            debit, acctno, acctname, payee_payer_id, empid, cashyn) 
            VALUES ($1, $2, $3, DEFAULT,$4, $5, $6, $7, $8, $9, $10)`,
        [i.journ_num, i.transtype, i.itemdate, i.description, i.debit,
        i.acctno, i.acctname, i.payee_payer_id, i.empid, i.cashyn]);
    return new Promise((resolve, reject) => {
        Debit.runInputQuery()
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
}

DebitCredit.prototype.runCredit = function () {
    var i = this.inputs;
    console.log('the inputs', i);
    var Credit = new Query(`INSERT INTO sys_gl 
            (journ_num, transtype, docdate, time, description, 
            credit, acctno, acctname, payee_payer_id, empid, cashyn) 
            VALUES ($1, $2, $3, DEFAULT, $4, $5, $6, $7, $8, $9, $10)`,
        [i.journ_num, i.transtype, i.itemdate, i.description, i.credit, 
            i.acctno, i.acctname, i.payee_payer_id, i.empid, i.cashyn]);
    return new Promise((resolve, reject) => {
        Credit.runInputQuery()
            .then( result => {
                resolve(result);
            })
            .catch( error => {
                reject(error);
            });
    });
}

module.exports = DebitCredit;