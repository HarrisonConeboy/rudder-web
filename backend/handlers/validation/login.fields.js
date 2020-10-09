const isEmpty = require('is-empty')
const valid = require('validator')

const database = require('../../database/utils/pool')()

/**
 * Middleware for checking the login fields in req.body and setting the req.database property
 */
module.exports = (req, res, next) => {
    let data = req.body
    let errors = {}

    // Replace empty fields with empty strings so that validator can process them
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Email check
    if (valid.isEmpty(data.email)) {
        errors.email = 'Email field cannot be empty'
    } else if (!valid.isEmail(data.email)) {
        errors.email = 'Not a valid email'
    }

    // Password check
    if (valid.isEmpty(data.password)) {
        errors.password = 'Password field cannot be empty'
    }

    if (!isEmpty(errors)) {
        res.status(400).json(errors)
        return next('router')

    }
    req.database = database
    next()
}