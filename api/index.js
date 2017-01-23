'use strict';

const Auth = require('../config/auth')
const Route = require('./routes')

exports.register = function (server, options, next) {

    server.auth.strategy(Auth.token.name, Auth.token.scheme, Auth.token.options)

    server.route(Route.routes)

    next()
}

exports.register.attributes = {
    pkg: require('./../package.json')
}
