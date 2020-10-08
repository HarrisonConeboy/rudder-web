const isEmpty = require('is-empty')
const Promise = require('promise')

/**
 * Used to determine if an email is currently already used by a user in the database
 * @param {String} email Email as String to match to a user
 * @param {Pool} database Database pool object used to search
 * @returns {errors, isValid} Returns errors object with the emailused property if found in database, and an isValid property to determine if the email was found. isValid is true if no email found.
 */
module.exports = async(email, database) => {
    await database.query(`SELECT * FROM users WHERE email = $1`, [email]).then(value => {
        let errors = {}

        if (value.rows.length) {
            errors.emailused = 'User with that email exists'
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }).catch(err => {
        let errors = {
            databaseerror: err
        }

        return {
            errors,
            isValid: false
        }
    })
}