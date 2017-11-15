var Drinks = require('../models/drink')
var router = require('express').Router()


router.get('/api/drinks', (req, res, next) => {
    Drinks.find({})
        .then(drinks => {
            res.send(drinks)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/api/drinks/:id', (req, res, next) => {
    Drinks.findById(req.params.id)
        .then(drink => {
            res.send(drink)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/api/drinks', (req, res, next) => {
    if (!req.body.sizes.large || !req.body.sizes.medium || !req.body.sizes.small) {
        return res.send('INVALID DRINK PLEASE INCLUDE SIZES')
    }
    var drink = {
        name: req.body.name,
        sizes: {
            large: req.body.sizes.large,
            medium: req.body.sizes.medium,
            small: req.body.sizes.small
        }
    }
    Drinks.create(drink)
        .then(drink => {
            let response = {
                data: drink,
                message: "Successfully created Drink!"
            }
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.put('/api/drinks/:id', (req, res, next) => {
    var action = 'Update Drink'
    Drinks.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.send(handleResponse(action, data))
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})

router.delete('/api/drinks/:id', (req, res, next) => {
    Drinks.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send({ message: 'Successfully deleted drink' })
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

function handleResponse(action, data, error) {
    var response = {
        message: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}


module.exports = router