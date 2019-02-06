class AutoFill {
    constructor(){
        this.ref = {
            "acctname":"acctno",
            "acctno":"acctname",
            "bankname":"bankno",
            "bankno":"bankname",
            "customer":"customerid",
            "customerid":"customer",
            "supplier":"supplierid",
            "suppilerid":"supplier"
        }
    }

    getRef = (name) => {
        return this.ref[name];
    }

}

export default AutoFill;