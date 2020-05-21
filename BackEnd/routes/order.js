const router = require('express').Router();

const{ isLogged } = require( '../middlewares/middlewares')

const {
 createOrder, allOrders, allOrdersUser, detailOrder, updateOrder, deleOrder
} = require('../controllers/order')

// Order CRUD Routes

//Create

router.post('/order/create', createOrder)

//Read

router.get('/order/all', allOrders)
router.get('/order/all/myorders', allOrdersUser)
router.get('/order/:id', detailOrder)

//Update

router.patch('/order/edit/:id', isLogged, updateOrder)

//Delete

router.delete('/order/:id', isLogged, deleOrder)


module.exports = router;