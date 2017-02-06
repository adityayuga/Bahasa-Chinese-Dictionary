const Mongoose = require('mongoose')
const config = require('./config')

Mongoose.connect(config.database)
//Mongoose.connect("mongodb://memey:aksiomaekaristi@ds135519.mlab.com:35519/kamus")
const db = Mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback() {
    console.log("Connection with database succeeded.")
})

exports.Mongoose = Mongoose
exports.db = db
