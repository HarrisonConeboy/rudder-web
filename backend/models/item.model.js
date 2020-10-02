const mongoose = require('mongoose')

const Schema = mongoose.Schema

const item = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    user: {type: String, required: true}
}, {
    timestamps: true
})

const Item = mongoose.model('Item', item)

module.exports = Item
