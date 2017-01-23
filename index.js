'use strict';

const Hapi = require('hapi')
const Db = require('./config/db')
const Config = require('./config/config')

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
    register: require('./api')
}], {
    routes: {
        prefix: '/api/v1'
    }
}, (err) => {

    if (err) {
        throw err
    }
})

// Start the server
server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at:`, server.info.uri)
})
