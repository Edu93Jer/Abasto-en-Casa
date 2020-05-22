const router = require('express').Router();
const uploadConfig = require('../config/cloudinary')

const { isLogged } = require('../middlewares/middlewares')

const {
 createProduct, allProducts, detailProduct, updateProduct, deleProduct, departmentProduct,
} = require('../controllers/product')

router.post('/upload', uploadConfig.single('imageURL'), (req, res, next) => {
 if (!req.file) {
  next(new Error('No file uploaded'))
 }
 res.status(201).json({ secure_url: req.file.secure_url })
})

router.post('/product/create', isLogged, createProduct)

router.get('/product/all', allProducts)
router.get('/product/department', departmentProduct)
router.get('/product/:id', detailProduct)

router.patch('/product/edit/:id', isLogged, updateProduct)

router.delete('/product/:id', isLogged, deleProduct)

module.exports = router;