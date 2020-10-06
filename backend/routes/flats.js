// const router = require('express').Router()

// const Flat = require('../models/flat.model')
// const Item = require('../models/item.model')
// const User = require('../models/user.model')


// // MAKE SURE TO REMOVE THESE
// router.route('/')
//     .get((req, res) => {
//         Flat.find()
//             .then(data => res.json(data))
//             .catch(err => res.status(400).send(err))
//     })
//     .delete((req, res) => {
//         Flat.deleteMany({}, err => {
//             if (err) {
//                 return res.status(400).send(err)
//             } else {
//                 return res.send('All Deleted')
//             }
//         })
//     })



// router.route('/:id')
//     .get((req, res) => {
//         Flat.findById(req.params.id)
//             .then(data => res.json(data))
//             .catch(err => res.status(400).send(err))
//     })
//     .delete((req, res) => {
//         Flat.findByIdAndDelete(req.params.id)
//             .then(() => res.send('Flat deleted'))
//             .catch(err => res.send(err))
//     })

// router.route('/add')
//     .post((req, res) => {    

//         const newFlat = new Flat({
//             name: req.body.name,
//             members: [req.body.user],
//             items: []
//         })

//         newFlat.save()
//             .then(() => res.send('Flat Added'))
//             .catch(err => res.status(400).send(err))
//     })


// router.route('/users/add/:id')
//     .post((req, res) => {
//         const id = req.body.user
//         User.findById(req.body.user)
//             .then(user => {
//                 console.log(user)
//                 if (!user) {
//                     return res.status(400).send('User not found')
//                 }
//             })
//             .catch(err => res.status(400).send(err))
//         Flat.findByIdAndUpdate(req.params.id)
//             .then(flat => {
//                 console.log(flat)
//                 flat.members.push(id)
//                 flat.save()
//                     .then(() => res.send('User Added'))
//                     .catch(err => res.status(400).send(err))
//             })
//             .catch(err => res.status(400).send(err))
//     })

// router.route('/users/:flatid/:userid')
//     .delete((req, res) => {
//         Flat.findByIdAndUpdate(req.params.flatid)
//             .then(flat => {
//                 let result = flat.members.filter(user => user !== req.params.userid)

//                 flat.members = result

//                 flat.save()
//                     .then(() => res.send('User Removed'))
//                     .catch(err => res.status(400).send(err))
//             })
//     })


// router.route('/item/add/:id')
//     .post((req, res) => {
//         Flat.findByIdAndUpdate(req.params.id)
//             .then(flat => {
//                 const newItem = new Item({
//                     name: req.body.name,
//                     price: Number(req.body.price),
//                     user: req.body.user
//                 })

//                 flat.items.push(newItem)
//                 flat.save()
//                     .then(() => res.send('Item Added'))
//                     .catch(err => res.status(400).send(err))
//             })
        
//     })


// router.route('/item/:flatid/:itemid')
//     .delete((req, res) => {
//         Flat.findByIdAndUpdate(req.params.flatid)
//             .then(flat => {
//                 let result = flat.items.filter(item => String(item._id) !== req.params.itemid)

//                 flat.items = result

//                 flat.save()
//                     .then(() => res.send('Item Removed'))
//                     .catch(err => res.send(err))
//             })
//     })
//     .post((req, res) => {
//         Flat.findByIdAndUpdate(req.params.flatid)
//             .then(flat => {
//                 let items = []
//                 flat.items = flat.items.forEach(item => {
//                     if (String(item._id) === req.params.itemid) {
//                         item.name = req.body.name
//                         item.price = Number(req.body.price)
//                         item.user = req.body.user
//                     }
//                     items.push(item)
//                 })

//                 flat.items = items
                
//                 flat.save()
//                     .then(() => res.send('Item Updated'))
//                     .catch(err => res.status(400).send(err))
                
//             })
//     })


// module.exports = router
