const router = require('express').Router();
const uploadConfig = require('../config/cloudinary')

const{ isLogged } = require( '../middlewares/middlewares')

const {
 createProduct, allProducts, detailProduct, updateProduct, deleProduct, departmentProduct,
} = require('../controllers/product')

// Product CRUD Routes

router.post('/upload', uploadConfig.single('imageURL'), (req, res, next) => {
 if(!req.file){
  next(new Error('No file uploaded'))
 }
 res.status(201).json({secure_url: req.file.secure_url})
} )

//Create

router.post('/product/create', isLogged,  createProduct)

//Read

router.get('/product/all', allProducts)
router.get('/product/department', departmentProduct)
router.get('/product/:id', detailProduct)


//Update

router.patch('/product/edit/:id', isLogged,  updateProduct)

//Delete

router.delete('/product/:id', isLogged, deleProduct)

module.exports = router;