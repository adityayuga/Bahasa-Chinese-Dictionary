'use strict';

const Auth = require('../config/auth')
const Route = require('./routes')

exports.register = function (server, options, next) {

    server.auth.strategy(Auth.token.name, Auth.token.scheme, Auth.token.options)

    // Print some information about the incoming request for debugging purposes
    server.ext('onRequest', function (request, reply) {
        var ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
        console.log(ip, request.method.toUpperCase(), request.path, request.query)

        return reply.continue()
    })

    server.route(Route.routes)

    next()
}

exports.register.attributes = {
    pkg: require('./../package.json')
}
