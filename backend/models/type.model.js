const mongoose = require('mongoose')

const Schema = mongoose.Schema

const typeSchema = new Schema({
    type: String
})

const Item = mongoose.model('Type', typeSchema)

module.exports = Item 
