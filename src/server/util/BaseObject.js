function BaseObject() {
    this.error = [];
    this.response;
}

BaseObject.prototype.setError = function(error) {
    this.error.push(error);
}

BaseObject.prototype.getError = function() {
    return this.error;
}

BaseObject.prototype.respond = function(res, data, success, userNotify) {
    res.status(200).json({ 
        data: data,
        success: success, 
        userNotify: userNotify
    });
}

module.exports = BaseObject;