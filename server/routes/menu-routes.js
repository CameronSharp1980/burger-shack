var Burgers = require('../models/burger')
var Drinks = require('../models/drink')
var Sides = require('../models/side')
var router = require('express').Router()


router.get('/api/menus', (req, res, next) => {
    var menuItems = {
        burgers: [],
        drinks: [],
        sides: []
    }
    var shortMenu = {
        burgers: [],
        drinks: [],
        sides: []
    }

    Burgers.find({})
        .then(burgers => {
            menuItems.burgers = burgers
            Drinks.find({})
                .then(drinks => {
                    menuItems.drinks = drinks
                    Sides.find({})
                        .then(sides => {
                            menuItems.sides = sides
                            res.send(menuItems)
                        })
                        .catch(err => {
                            res.status(400).send({ Error: err, message: "sides" })
                        })
                })
                .catch(err => {
                    res.status(400).send({ Error: err, message: "drinks" })
                })
        })
        .catch(err => {
            res.status(400).send({ Error: err, message: "burgers" })
        })
})


module.exports = router