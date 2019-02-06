const Query = require('./../../util/Query');
const GenID = require('./../../util/GenID');
const DebitCredit = require('./../accounting/DebitCredit');

function JournalEntry(req, res) {
    this.inputs = req.body.inputs;
    this.res = res;
}

JournalEntry.prototype.preProcess = function() {
    for(i = 0; this.inputs.dorc.length > 0; i++) {
        
    }
}

JournalEntry.prototype.runCredit = function() {
    console.log('credit');
    const Credit = new DebitCredit(this.inputs);
    Credit.runCredit();
}

JournalEntry.prototype.runDebit = function() {
    console.log('debit');
    const Debit = new DebitCredit(this.inputs);
    Debit.runDebit();
}

module.exports = JournalEntry;