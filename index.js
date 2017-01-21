'use strict';

const Hapi = require('hapi')
const Db = require('./config/db')
const Config = require('./config/config')
const Moment = require('moment')

var app = {};
app.config = Config;

const server = new Hapi.Server()
server.connection({ port: app.config.server.port, host: app.config.server.host })

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    var ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
    console.log(ip, request.path, request.query)
    return reply.continue()
})

var privateKey = app.config.key.privateKey;
var ttl = app.config.key.tokenExpiry;

// Validate function to be injected
var validate = function(token, callback) {
    // Check token timestamp
    var diff = Moment().diff(Moment(token.iat * 1000))
    if (diff > ttl) {
        return callback(null, false)
    }
    callback(null, true, token)
}

// index
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply({ message: 'Welcome to Kamus Indonesia-Chinese API' }).code(200)
  }
})

// Plugins
server.register([{
    register: require('hapi-auth-jwt')
}, {
    register: require('./users'),
}], {
    routes: {
        prefix: '/api/v1'
    }
}, (err) => {

    if (err) {
        throw err
    }

    server.auth.strategy('token', 'jwt', {
        validateFunc: validate,
        key: privateKey
    })
})

// Start the server
server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at:`, server.info.uri)
})
