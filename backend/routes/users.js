const router = require('express').Router()
let User = require('../models/user.model')

router.route('/')
    .get((req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).send(err))
    })

router.route('/add')
    .post((req, res) => {
        const user = {
            name: req.body.name,
            email: req.body.email,
            age: Number(req.body.age)
        }

        const newUser = new User(user)

        newUser.save()
            .then(() => res.send('User Added'))
            .catch(err => res.status(400).send(err))
    })

router.route('/:id')
    .get((req,res) => {
        User.findById(req.params.id)
            .then(exercise => res.json(exercise))
            .catch(err => res.status(400).send(err))
    })
    .delete((req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(() => res.send('Exercise Deleted'))
            .catch(err => res.status(400).send(err))
    })


module.exports = router
