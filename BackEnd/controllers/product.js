const Product = require('../models/Product')

exports.createProduct = async ( req, res ) => {
 const product = await Product.create({ ...req.body })
 res.status(201).json({ product })
}

exports.allProducts = async ( req, res ) => {
 const products = await Product.find({ }).sort({ name: 1 })
 res.status(200).json({ products })
}

exports.departmentProduct = async ( req, res ) => {
 const data = req.query
 const department = await Product.find( data )
 res.status(200).json({ department })
}

exports.detailProduct = async ( req, res ) => {
 const { id } = req.params
 const product = await Product.findById( id )
 res.status(200).json({ product })
}

exports.updateProduct = async ( req, res ) => {
 const { id } = req.params
 const product = await Product.findByIdAndUpdate( id, { $set: { ...req.body }}, { new: true })
 res.status(200).json({ product })
}

exports.deleProduct = async ( req, res ) => {
 const { id } = req.params
 const product = await Product.findByIdAndDelete( id )
 res.status(200).json({ product })
}