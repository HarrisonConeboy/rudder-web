const validateRegistration = require('../validation/register.fields')
const emailDuplicate = require('../database/duplicate/email.duplicate')
const insertUserAndCreds = require('../database/insert/user_cred.insert')

module.exports = async(req, res, database) => {
    var { errors, isValid } = validateRegistration(req.body)
    if (!isValid) { return res.status(400).json(errors) }

    await emailDuplicate(req.body.email, database).then((result) => {
        console.log(result)
        var { errors, isValid } = result
        if (!isValid) { return res.status(400).json(errors) }
    })
    console.log('hey')

    var { errors, isValid } = insertUserAndCreds(req.body.firstname, req.body.lastname, req.body.email, req.body.password, database)
    if (!isValid) { return res.status(400).json(errors) }
    else { return res.send('User Added :)') }

}
