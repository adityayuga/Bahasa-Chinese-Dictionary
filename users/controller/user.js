const Joi = require('joi')
const Boom = require('boom')
const Common = require('./common')
const Config = require('../../config/config')
const Jwt = require('jsonwebtoken')
const User = require('../model/user').User

const privateKey = Config.key.privateKey

exports.create = {
    validate: {
        payload: {
            userName: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        request.payload.password = Common.encrypt(request.payload.password);
        request.payload.scope = "Author";
        User.saveUser(request.payload, function(err, user) {
            if (!err) {
                var tokenData = {
                    userName: user.userName,
                    scope: [user.scope],
                    id: user._id
                };
                reply("User created");
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"))
                } else reply(Boom.forbidden(err)) // HTTP 403
            }
        })
    }
}

exports.login = {
    validate: {
        payload: {
            userName: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        User.findUser(request.payload.userName, function(err, user) {
            if (!err) {
                if (user === null) {
                  reply(Boom.forbidden("invalid username or password"))
                }
                if (request.payload.password === Common.decrypt(user.password)) {

                    var tokenData = {
                        userName: user.userName,
                        scope: [user.scope],
                        id: user._id
                    }

                    var res = {
                        username: user.userName,
                        scope: [user.scope],
                        token: Jwt.sign(tokenData, privateKey)
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
            userName: Joi.string().email().required()
        }
    },
    handler: function(request, reply) {
        User.findUser(request.payload.userName, function(err, user) {
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
