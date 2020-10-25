const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Middleware for creating a jsonwebtoken that expires in a year if a user successfully logged in.
 * The token is returned in the response
 */
module.exports = (req, res, next) => {
    let user = req.user
    let key = process.env.secret
    
    const payload = {
        id: user.id,
        firstname: user.fristname,
        lastname: user.lastname
    }

    // Create token
    jwt.sign(payload, key, { expiresIn: 31556926 }, (err, token) => {
        if (err) {
            console.error('Error when making token in jwtoken.login - ', err)
            return next('router')
        }

        res.json({
            success: true,
            token: `Bearer ${token}`
        })
        next()
    })

}