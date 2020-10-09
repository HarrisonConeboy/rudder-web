/**
 * Middleware used to determine if an email is currently already used by a user in the database
 */
module.exports = async(req, res, next) => {
    let errors = {}
    let database = req.database
    await database.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]).then(value => {

        if (value.rows.length > 0) {
            errors.emailused = 'User with that email exists'
            res.status(400).json(errors)
            return next('router')
        }

        next()

    }).catch(err => {
        console.error('Error with database query in email.duplicate - ', err)
        res.status(400).json(err)
        next('router')
    })
}