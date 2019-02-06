const BaseObject = require('./BaseObject');

function BaseStatement() {
    this.error = [];
    this.response;
}

BaseStatement.prototype = BaseObject.prototype;
BaseStatement.prototype.constructor = BaseObject;

BaseStatement.prototype.respond = function(res, data, success, userNotify) {
    res.status(200).json({ 
        data: data,
        success: success, 
        userNotify: userNotify
    });
}

module.exports = BaseStatement;