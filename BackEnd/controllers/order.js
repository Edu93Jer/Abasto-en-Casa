const Order = require('../models/Order')

exports.createOrder = async (req, res) => {
 const data = req.body
 data.user = req.user._id
 data.shippingAddress = req.user.address
 const order = await Order.create({ ...data })
 res.status(201).json({ order })
}

exports.allOrders = async (req, res) => {
 const orders = await Order.find({}).sort({ createdAt: -1 })
 res.status(200).json({ orders })
}

exports.allOrdersUser = async (req, res) => {
 const { _id } = req.user
 const orders = await Order.find({ user: _id }).sort({ createdAt: -1 })
 res.status(200).json({ orders })
}

exports.detailOrder = async (req, res) => {
 const { id } = req.params
 const order = await Order.findById(id).populate('user')
 res.status(200).json({ order })
}

exports.updateOrder = async (req, res) => {
 const { id } = req.params
 const order = await Order.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true })
 res.status(200).json({ order })
}

exports.deleOrder = async (req, res) => {
 const { id } = req.params
 const order = await Order.findByIdAndDelete(id)
 res.status(200).json({ order })
}