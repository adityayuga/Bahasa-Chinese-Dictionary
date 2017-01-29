const Joi = require('joi')
const Boom = require('boom')
const Config = require('../../config/config')

exports.login = {
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {

    }
}
