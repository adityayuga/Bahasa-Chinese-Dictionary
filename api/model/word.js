const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../../config/db').db

/**
 * @module  Word
 * @description contain the details of Attribute
 */

var Word = new Schema({

    word: {
        type: String,
        unique: true,
        required: true
    },
    py: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    meaning: {
        type: [String]
    },
    author: {
      type: String,
      required: true
    },
    created_date: {
      type: Date,
      default: Date.now
    },
    update_date: {
      type: Date,
      default: Date.now
    }

})

Word.statics.saveWord = function(requestData, callback) {
    this.create(requestData, callback)
}

Word.statics.updateWord = function(id, word, callback) {
    var query = { _id: id };
    var update = {
      word: word.word,
      py: word.py,
      description: word.description,
      meaning: word.meaning,
      author: word.author,
      update_date: new Date()
    }

    this.findOneAndUpdate(query, update, {}, callback);
}

Word.statics.findOneByWord = function(query, callback) {
    this.findOne({
        word: query
    }, callback)
}

Word.statics.findAll = function(callback){
    this.find(callback)
}

Word.statics.findByWord = function(query, callback) {
    this.find({ $or : [
      {
          word: {
            $regex: query,
            $options: 'i'
          }
      },
      {
          py: {
            $regex: query,
            $options: 'i'
          }
      }
    ]}, callback)
}

Word.statics.findOneById = function(id, callback) {
    this.findOne({
        _id: id
    }, callback)
}

Word.statics.findByMeaning = function(query, callback) {
    this.find({
        meaning: {
          $regex: query,
          $options: 'i'
        }
    }, callback)
}

Word.statics.remove = function(id, callback) {
    this.findOneAndRemove({
      _id: id
    }, callback)
}

var word = mongoose.model('word', Word)

/** export schema */
module.exports = {
    Word: word
}
