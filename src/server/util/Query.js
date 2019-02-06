const db = require('./postgres.js');
const userConn = db.userConn;

function Query(prepare, values) {
    this.prepare = prepare;
    this.values = values;
    this.query = {"text":this.prepare, "values":this.values};
}

//this query execution triggers a server response
Query.prototype.runQuery = function(res) {
    userConn.query(this.query)
        .then(data => res.status(200).json({ data: data.rows, userNotify: {} }))
        .catch(e => {
            res.status(200).json({ table: [], userNotify: {error: 'Something went wrong, we are looking into it.'} })
            console.error(e.stack)
        })
}

Query.prototype.runInputQuery = function () {
    return new Promise((resolve) => {
        userConn.query(this.query)
            .then(data => {
                resolve(data);
            })
            .catch(e => {
                //console.error('query with error: ', this.query, 'error: ', e.stack)
                resolve({error:e});
            });
    });
}

//this query execution does not trigger a server response
//rather it returns a value from the query
Query.prototype.returnResult = function () {
    return new Promise((resolve) => {
        userConn.query(this.query)
            .then(data => {
                //console.log('the query: ', this.query, 'result: ', data)
                resolve(data);
            })
            .catch(e => {
                //console.error('query with error: ', this.query, 'error: ', e.stack)
                resolve({error:e});
            });
    });
}

module.exports = Query;