'use strict';

const User = require('./controller/user')

exports.routes = [
  { method: 'POST', path: '/user/create', config: User.create},
  { method: 'POST', path: '/user/login', config: User.login},
  { method: 'POST', path: '/user/forgotPassword', config: User.forgotPassword},
  { method: 'GET', path: '/user/list', config: User.list}
]
