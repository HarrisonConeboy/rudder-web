const valid = require('validator')
const isEmpty = require('is-empty')

module.exports = (data) => {
    errors = {}

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
