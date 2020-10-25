const router = require('express').Router()

// Register middleware
const registerFields = require('../handlers/auth/register.fields')
const emailDuplicate = require('../handlers/database/validation/email.duplicate')
const user_credInsert = require('../handlers/database/write/user_cred.write')

// Login middleware
const loginFields = require('../handlers/auth/login.fields')
const userRetrieve = require('../handlers/database/read/user.read')
const passwordCompare = require('../handlers/auth/password.compare')
const jwtoken = require('../handlers/token/jwtoken.create')


const deleteFriend = require('../handlers/friends/delete/fields.check')

// Authentication Routes
router.route('auth/register')
    .post(registerFields, emailDuplicate, user_credInsert)

router.route('auth/login')
    .post(loginFields, [userRetrieve, passwordCompare], jwtoken)


router.route('/friends')
    .post()
    .delete(deleteFriend)

router.route('/flats')
    .post()
    .delete()

// More routes to add >>>>>
////////////////////////////////////////////////////////////////////////////

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
