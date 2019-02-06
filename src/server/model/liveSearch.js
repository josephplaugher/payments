const db = require('./../util/postgres');
const userConn = db.userConn;

search = (req, res) => {
    let name = req.params.name;
    let val = req.params.value;
    let query = module.exports.setQuery(name, val);    
    module.exports.runQuery(query, val, res); 
}

setQuery = (name, val) => {
    var query;
    switch(name) {
        case 'acctname':
        case 'cor':    
            query = "SELECT acctname FROM sys_coa WHERE LOWER(acctname) LIKE LOWER($1) ORDER BY acctname ASC LIMIT 5";
        break;

        case 'acctno':
        case 'cor_acctno':
            query = "SELECT acctno FROM sys_coa WHERE CAST(acctno AS TEXT) LIKE $1 ORDER BY acctno ASC LIMIT 5";
        break;

        case 'bankname':
            query = "SELECT acctname FROM sys_coa WHERE type = 'Bank' AND LOWER(acctname) LIKE LOWER($1) ORDER BY acctname ASC LIMIT 5";
        break;

        case 'bankno':
            query = "SELECT acctno FROM sys_coa WHERE type = 'Bank' AND CAST(acctno AS TEXT) LIKE $1 ORDER BY acctno ASC LIMIT 5";
        break;

        case 'customer':
            query = "SELECT name FROM customers WHERE LOWER(name) LIKE LOWER($1) ORDER BY name ASC LIMIT 5";
        break;

        case 'customerid':
            query = "SELECT id FROM customers WHERE CAST(id AS TEXT) LIKE $1 ORDER BY id ASC LIMIT 5";
        break;

        case 'supplier':
            query = "SELECT name FROM suppliers WHERE LOWER(name) LIKE LOWER($1) ORDER BY name ASC LIMIT 5";
        break;

        case 'supplierid':
            query = "SELECT id FROM suppliers WHERE CAST(id AS TEXT) LIKE $1 ORDER BY id ASC LIMIT 5";
        break;
        
        case 'prop-id':
            query = "SELECT id FROM props WHERE CAST(id AS TEXT) LIKE ($1) ORDER BY id ASC LIMIT 5";
        break;

        case 'prop-ein':
            query = "SELECT ein FROM entity WHERE ein LIKE ($1) ORDER BY ein ASC LIMIT 5";
        break; 

        case 'prop-entity':
            query = "SELECT entity FROM props WHERE ein LIKE ($1) ORDER BY entity ASC LIMIT 5";
        break; 
        
        case 'prop-shortname':
            query = "SELECT shortname FROM props WHERE LOWER(shortname) LIKE LOWER($1) ORDER BY shortname ASC LIMIT 5";
        break;
        
        case 'prop-street':
            query = "SELECT DISTINCT(street) AS street FROM props WHERE LOWER(street) LIKE LOWER($1) ORDER BY street ASC LIMIT 5";
        break;
    
        case 'prop-city':
            query = "SELECT DISTINCT(city) AS city FROM props WHERE LOWER(city) LIKE LOWER($1) ORDER BY city ASC LIMIT 5";
        break;
    
        case 'prop-state':
            query = "SELECT DISTINCT(state) AS state FROM props WHERE LOWER(state) LIKE LOWER($1) ORDER BY state ASC LIMIT 5";
        break;
    
        case 'prop-zip':
            query = "SELECT DISTINCT(zip) AS zip FROM props WHERE CAST(zip AS TEXT) LIKE ($1) ORDER BY zip ASC LIMIT 5";
        break;

        default:
            query = 'no match';
            break;
    }
    return query;
}

  
runQuery = (sql, val, res) => {
    const param = '%'+ val +'%';
    const query = {
        "text": sql,
        "values": [param],
    }
        userConn.query(query)
          .then(data => {
            if(data.rows[0]){
                res.status(200).json({ results: data.rows })
            }
            if(!data.rows[0]){
                res.status(200).json({ nr: 'Nothing found' })
            }
        })
          .catch(error => console.error(error.message))
}

module.exports = {search, setQuery, runQuery};