const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../../config/db').db;

/**
 * @module  Log
 * @description contain the details of Attribute
 */

var Log = new Schema({

    /**
      ip addresses. is required field.
    */
    ip: {
        type: String,
        required: true
    },

    /**
      url path. is required field.
    */
    path: {
        type: String,
        required: true
    },

    /**
      method. is required field.
    */
    method: {
        type: String,
        required: true
    },

    /**
      params. is required field.
    */
    params: {
        type: String,
        required: true
    },

    /**
      created date. default by current date.
    */
    created_date: {
      type: Date,
      default: Date.now
    }


})

Log.statics.create = function(ip, method, path, params) {
    var requestData = {
      ip: ip,
      method: method,
      path: path,
      params: JSON.stringify(params)
    }

    console.log(requestData)
    //this.create(requestData)
}

Log.statics.findAll = function(callback) {
    this.find(callback)
}

var log = mongoose.model('log', Log)

/** export schema */
module.exports = {
    Log: log
}
