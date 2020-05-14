const Order = require('../models/Order')

exports.createOrder = async ( req, res ) => {
 const order = await Order.create({ ...req.body })
 res.status(201).json({ order })
}

exports.allOrders = async ( req, res ) => {
 const orders = await Order.find({ })
 res.status(200).json({ orders })
}

exports.detailOrder = async ( req, res ) => {
 const { id } = req.params
 const order = await Order.findById( id )
 res.status(200).json({ order })
}

exports.updateOrder = async ( req, res ) => {
 const { id } = req.params
 const order = await Order.findByIdAndUpdate( id, { $set: { ...req.body }}, { new: true })
 res.status(200).json({ order })
}

exports.deleOrder = async ( req, res ) => {
 const { id } = req.params
 const order = await Order.findByIdAndDelete( id )
 res.status(200).json({ order })
}