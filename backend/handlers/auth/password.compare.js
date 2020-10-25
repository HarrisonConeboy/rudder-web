const bcrypt = require('bcryptjs')

/**
 * Middleware for comparing non-hashed password vs hashed password stored in the database.
 * Returns error.passwordincorrect if no match, else we next
 */
module.exports = async(req, res, next) => {
    let errors = {}
    await bcrypt.compare(req.body.password, req.user.password)
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