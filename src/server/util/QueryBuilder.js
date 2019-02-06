function QueryBuilder (start, end) {
    this.start = start;
    this.end = end;
    this.conditions = [];
    this.query = this.start;
}

QueryBuilder.prototype.addCondition = function(input) {
    this.conditions.push(input);
}

QueryBuilder.prototype.build = function () {
    let opt = this.conditions;
    opt.forEach(cond => {
        this.query += cond;
    });
    this.query += this.end;
    let result = this.query;
    
    return result;
}

module.exports = QueryBuilder;