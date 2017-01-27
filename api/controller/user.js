const Joi = require('joi')
const Boom = require('boom')
const Common = require('./common')
const Config = require('../../config/config')
const Jwt = require('jsonwebtoken')
const User = require('../model/user').User

const privateKey = Config.key.privateKey
const tokenAlgorithms = Config.key.tokenAlgorithms

exports.login = {
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        User.findUserbyUsername(request.payload.username, function(err, user) {
            if (!err) {
                if (user === null) {
                  reply(Boom.forbidden("invalid username or password"))
                }
                if (request.payload.password === Common.decrypt(user.password)) {
                    var tokenData = {
                        username: user.username,
                        scope: [user.scope],
                        id: user._id
                    }

                    var res = {
                        username: user.username,
                        scope: [user.scope],
                        token: Jwt.sign(tokenData, privateKey, { algorithms: tokenAlgorithms })
                    }

                    reply(res);
                } else reply(Boom.forbidden("invalid username or password"))
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"))
                } else {
                        console.error(err);
                        return reply(Boom.badImplementation(err))
                }
            }
        })
    }
}

exports.forgotPassword = {
    validate: {
        payload: {
            username: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        User.findUserbyUsername(request.payload.username, function(err, user) {
            if (!err) {
                if (user === null){
                  return reply(Boom.forbidden("invalid username"))
                }

                Common.sentMailForgotPassword(user)

                reply("password is send to registered email id")
            } else {
                console.error(err);
                return reply(Boom.badImplementation(err))
             }
        })
    }
}

exports.create = {
    auth: {
        strategy: 'token',
        scope: 'Admin'
    },
    validate: {
        payload: {
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        request.payload.password = Common.encrypt(request.payload.password);
        request.payload.scope = "Author";
        User.saveUser(request.payload, function(err, user) {
            if (!err) {
                reply("User created");
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"))
                } else reply(Boom.forbidden(err)) // HTTP 403
            }
        })
    }
}


exports.list = {
    auth: {
        strategy: 'token',
        scope: 'Admin'
    },
    handler: function(request, reply) {
        User.findAll( function(err, user) {
            if (!err) {
                reply(user)
            } else {

                return reply(Boom.badImplementation(err))
            }
        })
    }
}

exports.getUser = {
    validate: {
        params: {
            id: Joi.string().required(),
        }
    },
    handler: function(request, reply) {
        Word.findUser( request.params.id, function(err, user){
          if (!err) {
              reply(user)
          } else {
              return reply(Boom.badImplementation(err))
          }
        })
    }
}

exports.remove = {
    auth: {
        strategy: 'token',
        scope: 'Admin'
    },
    validate: {
        params: {
            id: Joi.string().required()
        }
    },
    handler: function(request, reply) {
      User.remove( request.params.id, function(err, word){
        if (!err) {
            reply("User removed")
        } else {
            return reply(Boom.badImplementation(err))
        }
      })
    }
}
