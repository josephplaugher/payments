const db = require('../../util/postgres');
const Conn = db.userConn;

const Balance = (req, res) => {
    const query = {
        "text": `
            SELECT 
                sys_gl.acctname, sys_gl.acctno, sys_coa.type, SUM(debit) AS debitbal, SUM(credit) AS creditbal
            FROM sys_gl, sys_coa 
            WHERE sys_coa.acctname = sys_gl.acctname AND ledgerdate <= $1
            GROUP BY (sys_gl.acctname, sys_gl.acctno, sys_coa.type) 
            ORDER BY acctname ASC`,
        "values": [req.body.date]
    }
    Conn.query(query)
        .then(data => {
            var currentAssets = [];
            var fixedAssets = [];
            var currentLiabilities = [];
            var longTermLiabilities = [];
            var equity = [];
            var currentAssetsTotal = 0;
            var fixedAssetsTotal = 0;
            var currentLiabilitiesTotal = 0;
            var longTermLiabilitiesTotal = 0;
            var equityTotal = 0;

            let i;
            // this loop adds all the balance sheet result sets to their respective arrays for the server response
            // and calculates other category balances
            for(i = 0; i < data.rows.length; i++) {
                if(data.rows[i].type === 'Current Asset' || data.rows[i].type === 'Bank') {
                    currentAssets.push(data.rows[i])
                    currentAssetsTotal += parseFloat(data.rows[i].debitbal - data.rows[i].creditbal);
                }
                if(data.rows[i].type === 'Fixed Asset') {
                    fixedAssets.push(data.rows[i])
                    fixedAssetsTotal += parseFloat(data.rows[i].debitbal - data.rows[i].creditbal);
                }
                if(data.rows[i].type === 'Current Liabilities') {
                    currentLiabilities.push(data.rows[i])
                    currentLiabilitiesTotal += parseFloat(data.rows[i].creditbal - data.rows[i].debitbal);
                }
                if(data.rows[i].type === 'Long-Term Liabilities') {
                    longTermLiabilities.push(data.rows[i])
                    longTermLiabilitiesTotal += parseFloat(data.rows[i].creditbal - data.rows[i].debitbal);
                }
                if(data.rows[i].type === 'Equity') {
                    equity.push(data.rows[i])
                    equityTotal += parseFloat(data.rows[i].creditbal - data.rows[i].debitbal);
                }
            }
            var assetsTotal = parseFloat(currentAssetsTotal - fixedAssetsTotal);
            var liabilitiesTotal = parseFloat(currentLiabilitiesTotal + longTermLiabilitiesTotal)
            res.status(200).json({
                statementData: {
                    currentAssets: currentAssets,
                    fixedAssets: fixedAssets,
                    currentAssetsTotal: currentAssetsTotal,
                    fixedAssetsTotal: fixedAssetsTotal,
                    assetsTotal: assetsTotal,
                    currentLiabilities: currentLiabilities,
                    longTermLiabilities: longTermLiabilities,
                    currentLiabilitiesTotal: currentLiabilitiesTotal,
                    longTermLiabilitiesTotal: longTermLiabilitiesTotal,
                    liabilitiesTotal: liabilitiesTotal,
                    equity: equity,
                    equityTotal: equityTotal
                },
                success: true
            })
        })
        .catch(error => {
            console.log('income query error: ', error)
            res.status(200).json({ userNotify: {error: 'something went wrong, please try again'}});
        })
}

module.exports = Balance;