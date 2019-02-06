const db = require('../../util/postgres');
const client = db.userConn;
const Query = require('../../util/Query')
const QueryBuilder = require('../../util/QueryBuilder')

function FindCustomers(req, res) {
  this.req = req;
  this.res = res;
}

FindCustomers.prototype.Find = function() {
  if(typeof this.req.body === undefined ) {
    this.AllCustomers();
  } else {
    this.ByCriteria();
  }
}

FindCustomers.prototype.AllCustomers = function() {
    const query = `
    SELECT 
      id, name, contact, phone, email, street, city, state, zip
    FROM customers`;
    client.query(query)
      .then(data => this.res.status(200).json({ message: data.rows }))
      .catch(e => console.error(e.stack))
}

FindCustomers.prototype.ByCriteria = function() {
    QB = new QueryBuilder(`
    SELECT 
      id, name, contact, phone, email, street, city, state, zip
    FROM customers
    WHERE id IS NOT NULL `,'ORDER BY name ASC');
    let d = 1;
    for(var val in this.req.body){
      if(this.req.body[val] !== '') { 
          QB.addCondition(" AND " + [val] + " = $" + d );
        d ++;
    }}
  
    var popInputs = [];
    for(var param in this.req.body) {
      if(this.req.body[param] !== '') { 
        popInputs.push(this.req.body[param]);
    }}
  
    let prepare = QB.build(); 
    console.log('the query', prepare, 'the inputs', popInputs);
    const find = new Query(prepare,popInputs);
    find.runQuery(this.res);
}

module.exports = FindCustomers;