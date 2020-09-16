const router = require('express').Router()

const Item = require('../models/item.model')

router.route('/:id')
    .get((req, res) => {
        Item.findById(req.params.id)
            .then(item => res.json(item))
            .catch(err => res.status(400).send(err))
    })
    .delete((req, res) => {
        Item.findByIdAndDelete(req.params.id)
            .then(() => res.send('Item Deleted'))
            .catch(err => res.status(400).send(err))
    })

router.route('/update/:id')
    .post((req, res) => {
        Item.findById(req.params.id)
            .then(item => {
                item.name = req.body.name
                item.type = req.body.type
                item.price = Number(req.body.type)
                item.user = req.body.user

                item.save()
                    .then(() => res.send('Item Updated'))
                    .catch(err => res.status(400).send(err))
            })
    })

router.route('/')
    .get((req, res) => {
        Item.find()
            .then(items => res.json(items))
            .catch(err => res.status(400).send(err))
    })

router.route('/add')
    .post((req, res) => {
        const newItem = new Item({
            name: req.body.name,
            type: req.body.type,
            price: Number(req.body.price),
            user: req.body.user
        })

        newItem.save()
            .then(() => res.send('Item Added'))
            .catch(err => res.status(400).send(err))
    })
    

module.exports = router
