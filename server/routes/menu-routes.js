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
            for (let i = 0; i < menuItems.burgers.length; i++) {
                const burger = menuItems.burgers[i];
                shortMenu.burgers[i] = {}
                shortMenu.burgers[i].name = burger.name
                shortMenu.burgers[i].price = burger.price
            }
            Drinks.find({})
                .then(drinks => {
                    menuItems.drinks = drinks
                    for (let i = 0; i < menuItems.drinks.length; i++) {
                        const drink = menuItems.drinks[i];
                        shortMenu.drinks[i] = {}
                        shortMenu.drinks[i].name = drink.name
                        shortMenu.drinks[i].prices = drink.sizes
                    }
                    Sides.find({})
                        .then(sides => {
                            menuItems.sides = sides
                            for (let i = 0; i < menuItems.sides.length; i++) {
                                const side = menuItems.sides[i];
                                shortMenu.sides[i] = {}
                                shortMenu.sides[i].name = side.name
                                shortMenu.sides[i].price = side.price
                            }
                            res.send(shortMenu)
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