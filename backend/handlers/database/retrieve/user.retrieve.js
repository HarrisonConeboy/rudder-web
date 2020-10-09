/**
 * Middleware for retrieving user via their email from the database and string given in the request 
 */
module.exports = async(req, res, next) => {
    let errors = {}
    let database = req.database
    let query = `SELECT *
                 FROM users JOIN creds
                 ON users.id = creds.userid
                 WHERE email = $1;`

    await database.query(query, [req.body.email])
        .then(queryReturn => {
            if (!queryReturn.rows.length > 0) {
                errors.usernotfound = 'User not found'
                res.status(400).json(errors)
                return next('router')
            }

            req.user = queryReturn.rows[0]
            next()
        })
        .catch(err => {
            console.error('Error in user.retrieve with database query - ', err)
            res.status(400).send(err)
        })
}