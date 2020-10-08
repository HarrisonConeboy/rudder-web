const validateRegistration = require('../validation/register.fields')
const emailDuplicate = require('../database/duplicate/email.duplicate')
const insertUserAndCreds = require('../database/insert/user_cred.insert')

module.exports = async (req, res, database) => {
    var { errors, isValid } = await validateRegistration(req.body)
    if (!isValid) { return res.status(400).json(errors) }

    var { errors, isValid } = await emailDuplicate(req.body.email, database)
    if (!isValid) { return res.status(400).json(errors) }

    var { errors, isValid } = await insertUserAndCreds(req.body.firstname, req.body.lastname, req.body.email, req.body.password, database)
    if (!isValid) { return res.status(400).json(errors) }
    else { return res.send('User Added :)') }

}
