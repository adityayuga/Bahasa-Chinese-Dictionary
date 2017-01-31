const Joi = require('joi')
const Boom = require('boom')
const Config = require('../../config/config')
const Word = require('../model/word').Word
const Diacritics = require('./diacritics')

exports.create = {
    auth: 'token',
    validate: {
        payload: {
            word: Joi.string().required(),
            py: Joi.string().required(),
            description: Joi.string().required(),
            meaning: Joi.array().items(Joi.string().required()).required(),
            author: Joi.string().required()
        }
    },
    handler: function(request, reply) {

        request.payload.author = "Author";

        Word.saveWord(request.payload, function(err, word) {
            if (!err) {
                reply("Word created");
            } else {
                reply(Boom.forbidden(err))
            }
        })
    }
}

exports.update = {
    auth: 'token',
    validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
            word: Joi.string().required(),
            py: Joi.string().required(),
            description: Joi.string().required(),
            meaning: Joi.array().items(Joi.string().required()),
            author: Joi.string().required()
        }
    },
    handler: function(request, reply) {
      Word.updateWord( request.params.id, request.payload, function(err, word){
        if (!err) {
            reply("Word updated")
        } else {
            return reply(Boom.badImplementation(err))
        }
      })
    }
}

exports.remove = {
    auth: 'token',
    validate: {
        params: {
            id: Joi.string().required()
        }
    },
    handler: function(request, reply) {
      Word.remove( request.params.id, function(err, word){
        if (!err) {
            reply("Word removed")
        } else {
            return reply(Boom.badImplementation(err))
        }
      })
    }
}

exports.getWord = {
    validate: {
        params: {
            id: Joi.string().required(),
        }
    },
    handler: function(request, reply) {
        Word.getWordById( request.params.id, function(err, word){
          if (!err) {
              reply(word)
          } else {
              return reply(Boom.badImplementation(err))
          }
        })
    }
}

exports.search = {
    handler: function(request, reply) {

        if(!request.query.q){
          //console.log('A')
          Word.findAll( function(err, word) {
            if (!err) {
                reply(word)
            } else {
                return reply(Boom.badImplementation(err))
            }
          })
        }else if(request.query.m){
          //console.log('B')
          if(request.query.m == "chinese"){
            //console.log('C')
            //console.log(Diacritics.preprocessWord(request.query.q))
              Word.findByWord( Diacritics.preprocessWord(request.query.q), function(err, word) {
                if (!err) {
                    reply(word)
                } else {
                    return reply(Boom.badImplementation(err))
                }
              })
          }else if(request.query.m == "indonesia"){
            //console.log('D')
              Word.findByMeaning( request.query.q, function(err, word) {
                if (!err) {
                    reply(word)
                } else {
                    return reply(Boom.badImplementation(err))
                }
              })
          }
        }else{
          //console.log('E')
          Word.findByWord( request.query.q, function(err, word) {
          if (!err) {
              reply(word)
          } else {
              return reply(Boom.badImplementation(err))
          }
        })
      }
    }
}
