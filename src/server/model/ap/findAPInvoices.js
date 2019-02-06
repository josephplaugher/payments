const Query = require('../../util/Query')
const QueryBuilder = require('../../util/QueryBuilder')

const FindAPInvoices = (req, res) => {
  QB = new QueryBuilder(`
    SELECT invnum, invdate,
    duedate, total, supplierid, supplier, status 
    FROM bills 
    WHERE header = 't'`,'');
  let d = 1;
  for(var val in req.body){
    if(req.body[val] !== '') { 
        QB.addCondition(" AND " + [val] + " = $" + d );
      d ++;
  }}

  var popInputs = [];
  for(var param in req.body) {
    if(req.body[param] !== '') { 
      popInputs.push(req.body[param]);
  }}

  let prepare = QB.build(); 
  console.log('the query', prepare, 'the inputs', popInputs);
  const find = new Query(prepare,popInputs);
  find.runQuery(res);
}

module.exports = FindAPInvoices;