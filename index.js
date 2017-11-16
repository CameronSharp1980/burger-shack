var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab/mlab-config')
var port = 3000

//route variables
var burgerRoutes = require('./server/routes/burger-routes')
var drinkRoutes = require('./server/routes/drink-routes')
var sideRoutes = require('./server/routes/side-routes')
var menuRoutes = require('./server/routes/menu-routes')

//register Middlewear
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

///register routes
server.use(burgerRoutes)
server.use(drinkRoutes)
server.use(sideRoutes)
server.use(menuRoutes)

server.listen(port, function () {
    console.log('Serving burgers on port: ', port)
})