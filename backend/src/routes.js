const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const mongodbclient = require('./mongodb');
const client = require('./mongodb');
const assert = require('assert');

const routes = express.Router()

const UserController = require('./controllers/users')

const baseapi = "/api/v1"

routes.get('/status', function (req, res) {
    res.send('online')
    //console.log(mongodbclient)
    
});


routes.post(`${baseapi}/user`, celebrate({
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(20)
  })  
}), UserController.create)



module.exports = routes