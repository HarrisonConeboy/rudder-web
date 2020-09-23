const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const valid = require('validator')
const dotenv = require('dotenv')

const validateRegistration = require('../validation/register')
const validateLogin = require('../validation/login')

let User = require('../models/user.model')

require('dotenv').config()
const key = process.env.SECRET

router.route('/register')
    .post((req, res) => {
        let { errors, isValid } = validateRegistration(req.body)
        if (!isValid) { return res.status(400).json(errors) }

        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    return res.status(400).send('User with that email already exists')
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) { throw err }
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) { throw err }
                            newUser.password = hash
                            newUser.save()
                                .then(() => res.send('New user registered'))
                                .catch(err => res.status(400).send(err))
                        })
                    })
                    
                }
            })
    })

router.route('/login')
    .post((req, res) => {
        let { errors, isValid } = validateLogin(req.body)
        if (!isValid) { return res.status(400).json(errors) }

        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    errors.emailnotfound = 'User not found :('
                    return res.status(400).json(errors)
                }
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name
                            }

                            jwt.sign(
                                payload,
                                key,
                                {
                                    expiresIn: 31556926
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    })
                                }
                            )
                        } else {
                            errors.passwordincorrect = 'Incorrect password :('
                            return res.status(400).json(errors)
                        }
                    })
            })
    })


// router.route('/')
//     .get((req, res) => {
//         User.find()
//             .then(users => res.json(users))
//             .catch(err => res.status(400).send(err))
//     })

// router.route('/add')
//     .post((req, res) => {
//         const user = {
//             name: req.body.name,
//             email: req.body.email,
//             age: Number(req.body.age)
//         }

//         const newUser = new User(user)

//         newUser.save()
//             .then(() => res.send('User Added'))
//             .catch(err => res.status(400).send(err))
//     })

// router.route('/:id')
//     .get((req,res) => {
//         User.findById(req.params.id)
//             .then(exercise => res.json(exercise))
//             .catch(err => res.status(400).send(err))
//     })
//     .delete((req, res) => {
//         User.findByIdAndDelete(req.params.id)
//             .then(() => res.send('Exercise Deleted'))
//             .catch(err => res.status(400).send(err))
//     })


module.exports = router
