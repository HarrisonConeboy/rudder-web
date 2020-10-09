const bcrypt = require('bcryptjs')

/**
 * Middleware used to insert a new user into the database
 */
module.exports = async(req, res, next) => {
    let database = req.database
    // Needs refactoring, I need to combine these two queries into one.
    // Insert followed by another insert using the returning id generated from the first insert
    await bcrypt.genSalt(10).then(salt => bcrypt.hash(req.body.password, salt))
        .then(hash => {
            // First insert
            return database.query(`INSERT INTO users (firstname, lastname, email)
                            VALUES ($1, $2, $3)
                            RETURNING id;` , [req.body.firstname, req.body.lastname, req.body.email])

                .then(insertResult => {
                    // Second insert
                    return database.query(`INSERT INTO creds (userid, password)
                                    VALUES ($1, $2);`, [insertResult.rows[0].id, hash])
                })
        })
        .then(() => {
            res.send('User added')
            next()
        })
        .catch(err => {
            console.error('Error with database query in user_cred.insert - ', err)
            res.status(400).send(err)
            next('router')
        })

}