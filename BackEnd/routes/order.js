const router = require('express').Router();

// Import controllers

const {
 createOrder, allOrders, detailOrder, updateOrder, deleOrder
} = require('../controllers/order')

// Order CRUD Routes

//Create

router.post('/order/create', createOrder)

//Read

router.get('/order/all', allOrders)
router.get('/order/:id', detailOrder)

//Update

router.patch('/order/edit/:id', updateOrder)

//Delete

router.delete('/order/:id', deleOrder)


module.exports = router;