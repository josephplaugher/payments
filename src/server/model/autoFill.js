const db = require('./../util/postgres');
const userConn = db.userConn;

fill = (req, res) => {
    let name = req.params.name;
    let val = req.params.value;
    let query = module.exports.setQuery(name);    
    module.exports.runQuery(query, val, res); 
}

setQuery = (name, val) => {
    var query;
    switch(name) {
        case 'acctname':
        case 'cor':    
            query = "SELECT acctno FROM sys_coa WHERE LOWER(acctname) = LOWER($1) ";
        break;

        case 'acctno':
        case 'cor_acctno':
            query = "SELECT acctname FROM sys_coa WHERE CAST(acctno AS TEXT) = $1 ";
        break;

        case 'bankname':
            query = "SELECT acctno FROM sys_coa WHERE type = 'Bank' AND LOWER(acctname) = LOWER($1) ";
        break;

        case 'bankno':
            query = "SELECT acctname FROM sys_coa WHERE type = 'Bank' AND CAST(acctno AS TEXT) = $1 ";
        break;

        case 'customer':
            query = "SELECT id FROM customers WHERE LOWER(name) = LOWER($1) ";
        break;

        case 'customerid':
            query = "SELECT name FROM customers WHERE CAST(id AS TEXT) = $1 ";
        break;

        case 'supplier':
            query = "SELECT id FROM suppliers WHERE LOWER(name) = LOWER($1) ";
        break;

        case 'supplierid':
            query = "SELECT name FROM suppliers WHERE CAST(id AS TEXT) = $1 ";
        break;
        
        case 'prop-id':
            query = "SELECT id FROM props WHERE CAST(id AS TEXT) = ($1) ";
        break;

        case 'prop-ein':
            query = "SELECT ein FROM entity WHERE ein = ($1) ";
        break; 

        case 'prop-entity':
            query = "SELECT entity FROM props WHERE ein = ($1) ";
        break; 
        
        case 'prop-shortname':
            query = "SELECT shortname FROM props WHERE LOWER(shortname) = LOWER($1) ";
        break;
        
        case 'prop-street':
            query = "SELECT DISTINCT(street) AS street FROM props WHERE LOWER(street) = LOWER($1) ";
        break;
    
        case 'prop-city':
            query = "SELECT DISTINCT(city) AS city FROM props WHERE LOWER(city) = LOWER($1) ";
        break;
    
        case 'prop-state':
            query = "SELECT DISTINCT(state) AS state FROM props WHERE LOWER(state) = LOWER($1) ";
        break;
    
        case 'prop-zip':
            query = "SELECT DISTINCT(zip) AS zip FROM props WHERE CAST(zip AS TEXT) = ($1) ";
        break;

        default:
            query = 'no match';
            break;
    }
    return query;
}

  
runQuery = (sql, val, res) => {
    const param = val;
    const query = {
        "text": sql,
        "values": [param],
    }
        userConn.query(query)
          .then(data => {
            if(data.rows[0]){
                res.status(200).json({ results: data.rows[0] })
            }
            if(!data.rows[0]){
                res.status(200).json({ nr: 'Nothing found' })
            }
        })
          .catch(error => console.error(error.message))
}

module.exports = {fill, setQuery, runQuery};