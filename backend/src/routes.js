const express = require('express')
//const { celebrate, Segments, Joi } = require('celebrate')
//const assert = require('assert');
const {verifyTokenScope} = require("./utils/auth")

const routes = express.Router()


const AuthUsersController = require('./controllers/authUsers')
const StoreController = require('./controllers/store')
const OrderController = require('./controllers/order')

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

//Loja
routes.get(`${baseapi}/store/list`,verifyTokenScope(["user-read-data"]), StoreController.listStores)      // Lista as lojas que o usuario tem acesso

routes.get(`${baseapi}/store/`,verifyTokenScope(["user-read-data"]), StoreController.infoStore)              // retorna as informações da loja
routes.post(`${baseapi}/store/`,verifyTokenScope(["user-change-data"]), StoreController.addStore)             // cria uma loja 
routes.put(`${baseapi}/store/`,verifyTokenScope(["user-change-data"]), StoreController.updateStore)              // altera informações basicas da loja
routes.delete(`${baseapi}/store/`,verifyTokenScope(["user-change-data"]), )           // remove a loja
//Vendedores
routes.post(`${baseapi}/store/vendor`,verifyTokenScope(["user-change-data"]), StoreController.addVendor)           // adiciona um ou mais vendedores
routes.delete(`${baseapi}/store/vendor`,verifyTokenScope(["user-change-data"]), StoreController.removeVendor)         // remove um ou mais vendedores  

//Vendas
routes.get(`${baseapi}/order/`, OrderController.listOrDetail)
routes.post(`${baseapi}/order/`, OrderController.create)
routes.post(`${baseapi}/order/package`, OrderController.createPackage)




module.exports = routes