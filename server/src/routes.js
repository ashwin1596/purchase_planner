const express = require('express');
const routes = express.Router();
const verifyToken = require('./config/verifyToken');

const UserController = require('./controllers/UserController');
const ItemController = require('./controllers/ItemController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');


routes.get('/status', (req, res)=>{
    res.send({status:200});
})

//Login
routes.post('/login', LoginController.store)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

//Dashboard
routes.get('/dashboard', verifyToken ,DashboardController.getAllItems)
routes.get('/dashboard/:category', verifyToken ,DashboardController.getAllItems)
routes.get('/item/:itemId', verifyToken ,DashboardController.getItemById)

routes.post('/item/upvote', verifyToken ,DashboardController.updateItem)
routes.post('/item/downvote/:itemId', verifyToken ,DashboardController.downVoteItem)

//Items
routes.post('/item/add', verifyToken ,ItemController.createItem)
routes.delete('/item/:itemId', verifyToken ,ItemController.delete)

module.exports = routes;