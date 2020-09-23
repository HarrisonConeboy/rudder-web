const valid = require('validator')
const isEmpty = require('is-empty')


module.exports = (data) => {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password : ''

    // Name check
    if (valid.isEmpty(data.name)) {
        errors.name = 'Name field cannot be empty'
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

    return {
        errors,
        isValid: isEmpty(errors)
    }

}
