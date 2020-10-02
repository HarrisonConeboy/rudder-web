const mongoose= require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    flat: {type: String},
    flatRequests: [String],
    friends: [String],
    friendRequests: [String]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
