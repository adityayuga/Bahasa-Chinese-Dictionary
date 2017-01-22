'use strict';

var User   = require('./controller/user')

exports.register = function (server, options, next) {

    server.route([
      { method: 'POST', path: '/user/login', config: User.login},
      { method: 'POST', path: '/user/forgotPassword', config: User.forgotPassword}
    ])

    next()
}

exports.register.attributes = {
    pkg: require('./../package.json')
}
