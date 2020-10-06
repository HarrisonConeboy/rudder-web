const router = require('express').Router()
const database = require('../utils/pool')()
const bcrypt = require('bcryptjs')
const sqlstring = require('sqlstring')
const jwt = require('jsonwebtoken')

const validateRegistration = require('../validation/register')
const validateLogin = require('../validation/login')

require('dotenv').config()
const key = process.env.SECRET


router.route('/register')
    .post((req, res) => {
        let { errors, isValid } = validateRegistration(req.body)
        if (!isValid) { return res.status(400).json(errors) }

        database.query(`SELECT * FROM users WHERE email = ${sqlstring.escape(req.body.email)}`, (err, value) => {
            if (err) { 
                return res.status(400).json(err)
            }
            console.log(value)
            if (value) {
                errors.emailused = 'User with that email exists'
                return res.status(400).send(errors)
            }
        })

        bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(req.body.password, salt)
                    .then(hash => {
                        database.query(`INSERT INTO users (firstname, lastname, email)
                                        VALUES (${req.body.firstname}, ${req.body.lastname}, ${req.body.email});
                                        INSERT INTO creds (password)
                                        VALUES (${hash});`)
                            .then(result => {
                                res.send('User added')
                            })
                    })
            })
            .catch(err => res.status(400).send(err))

        // Old noSQL method
        // User.findOne({email: req.body.email})
        //     .then(user => {
        //         if (user) {
        //             return res.status(400).send('User with that email already exists')
        //         } else {
        //             const newUser = new User({
        //                 name: req.body.name,
        //                 email: req.body.email,
        //                 password: req.body.password
        //             })

        //             bcrypt.genSalt(10, (err, salt) => {
        //                 if (err) { throw err }
        //                 bcrypt.hash(newUser.password, salt, (err, hash) => {
        //                     if (err) { throw err }
        //                     newUser.password = hash
        //                     newUser.save()
        //                         .then(() => res.send('New user registered'))
        //                         .catch(err => res.status(400).send(err))
        //                 })
        //             })
                    
        //         }
        //     })
    })

// router.route('/login')
//     .post((req, res) => {
//         let { errors, isValid } = validateLogin(req.body)
//         if (!isValid) { return res.status(400).json(errors) }

//         User.findOne({email: req.body.email})
//             .then(user => {
//                 if (!user) {
//                     errors.emailnotfound = 'User not found :('
//                     return res.status(400).json(errors)
//                 }
//                 bcrypt.compare(req.body.password, user.password)
//                     .then(isMatch => {
//                         if (isMatch) {
//                             const payload = {
//                                 id: user.id,
//                                 name: user.name
//                             }

//                             jwt.sign(
//                                 payload,
//                                 key,
//                                 {
//                                     expiresIn: 31556926
//                                 },
//                                 (err, token) => {
//                                     res.json({
//                                         success: true,
//                                         token: `Bearer ${token}`
//                                     })
//                                 }
//                             )
//                         } else {
//                             errors.passwordincorrect = 'Incorrect password :('
//                             return res.status(400).json(errors)
//                         }
//                     })
//             })
//     })

// router.route('/requests/accept/friend')
//     .post((req, res) => {
//         User.findByIdAndUpdate(req.body.user)    
//             .then(user => {
//                 user.friendRequests = user.friendRequests.filter(str => str !== req.body.request)

//                 if (req.body.accept) {
//                     user.friends.push(req.body.request)

//                     User.findByIdAndUpdate(req.body.request)
//                         .then(friend => {
//                             if (friend) {
//                                 friend.friends.push(String(user._id))

//                                 friend.save()
//                                     .then(() => console.log('Friend Added'))
//                                     .catch(err => res.send(err))
//                             } else {
//                                 return res.status(400).send('User not found')
//                             }
//                         })
                    
//                         user.save()
//                             .then(() => res.send('Friends Added'))
//                             .catch(err => res.status(400).send(err))
//                 } else {
//                     user.save()
//                     .then(() => res.send('Friend declined'))
//                     .catch(err => res.status(400).send(err))
//                 }
//             })
//     })


// router.route('/requests/send/friend')
//     .post((req, res) => {
//         User.findOne({email: req.body.email})
//             .then(user => {
//                 if (user) {
//                     user.friendRequests.push(req.body.user)
//                     user.save()
//                         .then(() => res.json(user))
//                         .catch(err => res.status(400).send(err))
//                 } else {
//                     res.status(400).send('User not found')
//                 }
//             })
//     })

// router.route('/friend/:id/:friendid')
//     .delete((req, res) => {
//         User.findByIdAndUpdate(req.params.id)
//             .then(user => {
//                 user.friends = user.friends.filter(friend => friend !== req.params.friendid)

//                 User.findByIdAndUpdate(req.params.friendid)
//                     .then(user2 => {
//                         if (user2) {
//                             user2.friends = user2.friends.filter(friend2 => friend2 !== req.params.id)

//                             user2.save()
//                                 .then(() => console.log('Friend removed'))
//                                 .catch(err => console.log(err))
//                         }
//                     })

//                 user.save()
//                     .then(() => res.send('Friend removed'))
//                     .catch(err => res.status(400).send(err))
//             })
//     })





// router.route('/')
//     .get((req, res) => {
//         User.find()
//             .then(users => res.json(users))
//             .catch(err => res.status(400).send(err))
//     })

// // router.route('/add')
// //     .post((req, res) => {
// //         const user = {
// //             name: req.body.name,
// //             email: req.body.email,
// //             age: Number(req.body.age)
// //         }

// //         const newUser = new User(user)

// //         newUser.save()
// //             .then(() => res.send('User Added'))
// //             .catch(err => res.status(400).send(err))
// //     })

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
