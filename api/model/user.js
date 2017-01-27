const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../../config/db').db;

/**
 * @module  User
 * @description contain the details of Attribute
 */

var User = new Schema({

    /**
      username. Should be unique, is required and indexed.
    */
    username: {
        type: String,
        unique: true,
        required: true
    },

    /**
      email. It can only contain valid email id, should be unique, is required and indexed.
    */
    email: {
        type: String,
        unique: true,
        required: true
    },

    /**
      password. It can only contain string, is required field.
    */
    password: {
        type: String,
        required: true
    },

    /**
    Scope. It can only contain string, is required field, and should have value from enum array.
  */
    scope: {
        type: String,
        enum: ['Author', 'Admin'],
        required: true
    },

    /**
      propertyId. It can only contain string.
    */
    isVerified: {
        type: Boolean,
        default: true
    },

    /**
      created date. default by current date.
    */
    created_date: {
      type: Date,
      default: Date.now
    }

})

User.statics.saveUser = function(requestData, callback) {
    this.create(requestData, callback)
}

User.statics.updateUser = function(user, callback) {
    user.save(callback)
}

User.statics.findUser = function(id, callback) {
    this.findOne({
        _id: id
    }, callback)
}

User.statics.findUserbyUsername = function(username, callback) {
    this.findOne({
        username: username
    }, callback)
}

User.statics.findAll = function(callback) {
    this.find({
        scope: 'Author'
    }, callback)
}

User.statics.findUserByIdAndusername = function(id, username, callback) {
    this.findOne({
        _id: id,
        username: username
    }, callback)
}

User.statics.remove = function(id, callback) {
    this.findOneAndRemove({
      _id: id
    }, callback)
}

var user = mongoose.model('user', User)

/** export schema */
module.exports = {
    User: user
}
