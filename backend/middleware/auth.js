const isEmpty = require('is-empty')
const valid = require('validator')
const bcrypt = require('bcryptjs')
const registerFields = require('../handlers/auth/register.fields')

const database = require('../utils/pool')()

/**
 * Middleware for checking the login fields in req.body and setting the req.database property
 */
const loginFields = (req, res, next) => {
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


/**
 * Middleware for checking the registration fields in the req.body and setting the req.database property
 */
const registerFields = (req, res, next) => {
    let errors = {}
    let data = req.body

    // Replace empty fields with the empty string so that validator can process them
    data.firstname = !isEmpty(data.firstname) ? data.firstname : ''
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password : ''

    // Name check
    if (valid.isEmpty(data.firstname)) {
        errors.firstname = 'Name field cannot be empty'
    }

    // Name check
    if (valid.isEmpty(data.lastname)) {
        errors.lastname = 'Name field cannot be empty'
    }

    // Email check
    if (valid.isEmpty(data.email)) {
        errors.email = 'Email field cannot be empty'
    } else if (!valid.isEmail(data.email)) {
        errors.email = 'Not a valid email'
    }

    // Password check
    if (valid.isEmpty(data.password)) {
        errors.password = 'Password field cannot be empty'
    } else if (!valid.isLength(data.password, {min:6, max:30})) {
        errors.password = 'Password must be between length 6 and 30'
    }

    if (!valid.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must be the same'
    }

    if (!isEmpty(errors)) {
        res.status(400).json(errors)
        return next('router')
    }

    req.database = database
    next()

}


/**
 * Middleware for comparing non-hashed password vs hashed password stored in the database.
 * Returns error.passwordincorrect if no match, else we next
 */
const passwordCompare = (req, res, next) => {
    let errors = {}
    bcrypt.compare(req.body.password, req.user.password)
        .then(isMatch => {
            if (isMatch) {
                return next()
            }
            
            errors.passwordincorrect = 'Incorrect password'
            res.status(400).json(errors)
            next('router')
            
        })
        .catch(err => {
            console.error('Error in password.compare when using bcrypt.compare - ', err)
            res.status(400).send(err)
            next('router')
        })
}

// Export
const auth = {
    loginFields: loginFields,
    registerFields: registerFields,
    passwordCompare: passwordCompare
}

module.exports = auth
