const router = require('express').Router();

const{ isLogged } = require( '../middlewares/middlewares')

const {
 createProduct, allProducts, detailProduct, updateProduct, deleProduct
} = require('../controllers/product')

// Product CRUD Routes

//Create

router.post('/product/create', isLogged, createProduct)

//Read

router.get('/product/all', allProducts)
router.get('/product/:id', detailProduct)

//Update

router.patch('/product/edit/:id', isLogged, updateProduct)

//Delete

router.delete('/product/:id', isLogged, deleProduct)

module.exports = router;