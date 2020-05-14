const router = require('express').Router();

// Import controllers

const {
 createProduct, allProducts, detailProduct, updateProduct, deleProduct
} = require('../controllers/product')

// Product CRUD Routes

//Create

router.post('/product/create', createProduct)

//Read

router.get('/product/all', allProducts)
router.get('/product/:id', detailProduct)

//Update

router.patch('/product/edit/:id', updateProduct)

//Delete

router.delete('/product/:id', deleProduct)

module.exports = router;