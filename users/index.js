'use strict';

const User   = require('./controller/user')
const Auth = require('../config/auth')

exports.register = function (server, options, next) {

    server.auth.strategy(Auth.token.name, Auth.token.scheme, Auth.token.options)

    server.route([
      { method: 'POST', path: '/user/create', config: User.create},
      { method: 'POST', path: '/user/login', config: User.login},
      { method: 'POST', path: '/user/forgotPassword', config: User.forgotPassword}
    ])

    next()
}

exports.register.attributes = {
    pkg: require('./../package.json')
}
