'use strict';

const Admin = require('./controller/admin')

exports.routes = [
  { method: 'GET', path: '/login', handler(request, reply) { reply.file('admin/views/login.html') }},
  { method: 'GET', path: '/public/{type}/{file}', handler(request, reply) { reply.file('admin/public/' + request.params.type + '/' + request.params.file) }}
]
