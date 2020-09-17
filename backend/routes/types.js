const router = require('express').Router()

const Type = require('../models/type.model')

router.route('/')
    .get((req, res) => {
        Type.find()
            .then(types => res.json(types))
            .catch(err => res.status(400).send(err))
    })

router.route('/add')
    .post((req, res) => {
        const newType = new Type({
            type: req.body.type
        })

        newType.save()
            .then(() => res.send('Type Added'))
            .catch(err => res.status(400).send(err))
    })

router.route('/:id')
    .delete((req, res) => {
        Type.findOneAndDelete(req.params.id)
            .then(() => res.send('Type Deleted'))
            .catch(err => res.status(400).send(err))
    })

module.exports = router
