const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flat = new Schema({
    name: {type: String, required: true},
    members: [String],
    items: [{type: Object}]
})

const Flat = mongoose.model('Flat', flat)

module.exports = Flat
