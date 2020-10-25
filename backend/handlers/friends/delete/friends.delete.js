module.exports = (req, res, next) => {
    let database = req.database
    let user = req.query.userid
    let friend = req.query.friendid

    database.query(`INSERT INTO friendRequests (userid, friendid)
                    VALUES ($1, $2)`, [friend, user])
        .then(() => {
            res.send('Friend request deleted')
            next()
        })
        .catch(err => {
            console.error('Error in friends.send with query - ', err)
            res.send(err)
            next('router')
        })
}