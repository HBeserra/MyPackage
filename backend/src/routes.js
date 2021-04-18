const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
//const mongodbclient = require('./mongodb');
//const client = require('./mongodb');
//const assert = require('assert');

const routes = express.Router()

const UserController = require('./controllers/users')
const TrackerController = require('./controllers/tracker')
const StoreController = require('./controllers/store')
const AuthController = require('./controllers/auth')
const baseapi = "/api/v1"

routes.get('/status', function (req, res) {
    res.send('online')
    //console.log(mongodbclient)
    
});


routes.get(`${baseapi}/user`, UserController.get )
routes.post(`${baseapi}/user`, UserController.add )

routes.post(`${baseapi}/tracker/`, TrackerController.add )

routes.post(`${baseapi}/store/`, StoreController.add )

routes.get(`${baseapi}/auth`, AuthController.emailConfirmation)
routes.post(`${baseapi}/auth/`, AuthController.login)


module.exports = routes