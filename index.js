'use strict';

const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({ port: 3000, host: 'localhost' })

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    var ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
    console.log(ip, request.path, request.query)
    return reply.continue()
});

// index
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply({ message: 'Welcome to Kamus Indonesia-Chinese API' }).code(200)
  }
})

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
