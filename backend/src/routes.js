const express = require('express')
//const { celebrate, Segments, Joi } = require('celebrate')
//const assert = require('assert');


const routes = express.Router()

const {verifyTokenScope} = require("./utils/auth")

const AuthUsersController = require('./controllers/authUsers')

const baseapi = "/api/v1"

//user
routes.get(`${baseapi}/user`, verifyTokenScope(["user-read-data"]), AuthUsersController.userReadAccountInfo)
routes.post(`${baseapi}/user`, AuthUsersController.userCreateAccount)
routes.put(`${baseapi}/user`,verifyTokenScope(["user-change-data"]), AuthUsersController.userModifyAccount)
routes.put(`${baseapi}/user/email`,verifyTokenScope(["user-change-data"]), AuthUsersController.userModifyAccountEmail)
//auth
routes.post(`${baseapi}/auth/`, AuthUsersController.authLogin)
routes.get(`${baseapi}/auth/password`,  verifyTokenScope(["password-reset"]),AuthUsersController.authResetPasswordConfirmation)
routes.post(`${baseapi}/auth/password`, AuthUsersController.authResetPassword)
routes.get(`${baseapi}/auth/email`, verifyTokenScope(["email-confirmation"]),AuthUsersController.authEmailConfirmation)
routes.post(`${baseapi}/auth/email`, AuthUsersController.authResendAccountConfirmation)

module.exports = routes