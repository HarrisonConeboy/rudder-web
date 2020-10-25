const database = require('../../../utils/pool')()
const isEmpty = require('is-empty')


module.exports = (req, res, next) => {
    let user = req.query.userid
    let friend = req.query.friendid

    let errors = {}

    if (!user) {
        if (!friend) {
            errors.user = 'User field cannot be empty'
            errors.friend = 'Friend field cannot be empty'
            console.error('Both friend and user field is missing')
        } else {
            errors.user = 'User field cannot be empty'
            console.error('user field is missing')
        }
    } else if (!friend) {
        errors.friend = 'Friend field cannot be empty'
        console.error('friend field is missing')
    }

    if (!isEmpty(errors)) {
        res.status(400).json(errors)
        return next('router')
    }

    req.database = database

    next()
    
}