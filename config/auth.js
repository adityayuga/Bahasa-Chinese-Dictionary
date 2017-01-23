const Config = require('./config')
const Moment = require('moment')

var app = {};
app.config = Config

const privateKey = app.config.key.privateKey;
const ttl = app.config.key.tokenExpiry;
const tokenAlgorithms = app.config.key.tokenAlgorithms;

// Validate function to be injected
const validate = function(request, token, callback) {
    // Check token timestamp
    var diff = Moment().diff(Moment(token.iat * 1000))

    if (diff > ttl) {
        return callback(null, false)
    }
    callback(null, true, token)
}

exports.token = {
    name    : 'token',
    scheme  : 'jwt',
    options : {
      key           : privateKey,
      validateFunc  : validate,
      verifyOptions : { algorithms: tokenAlgorithms }
    }
}
