'use strict';

const Auth = require('../config/auth')
const Route = require('./routes')

exports.register = function (server, options, next) {

    server.realm.modifiers.route.prefix = '/admin'

    server.route(Route.routes)

    next()
}

exports.register.attributes = {
    name: 'client-admin',
    version: '0.0.1',
    pkg: require('./../package.json')
}
