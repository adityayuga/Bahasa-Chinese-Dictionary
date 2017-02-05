'use strict';

const User = require('./controller/user')
const Word = require('./controller/word')

exports.routes = [
  { method: 'POST', path: '/user/create', config: User.create},
  { method: 'POST', path: '/user/login', config: User.login},
  { method: 'POST', path: '/user/forgotPassword', config: User.forgotPassword},
  { method: 'GET', path: '/user/list', config: User.list},
  { method: 'DELETE', path: '/user/{id}', config: User.remove},
  { method: 'GET', path: '/user/{id}', config: User.getUser},

  { method: 'GET', path: '/word/search', config: Word.search},
  { method: 'POST', path: '/word/create', config: Word.create},
  { method: 'GET', path: '/word/{word}', config: Word.getWord},
  { method: 'PUT', path: '/word/{id}', config: Word.update},
  { method: 'DELETE', path: '/word/{id}', config: Word.remove},

]
