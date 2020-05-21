const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  products:  Array,
  total: {type: Number},
  paid: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  shippingAddress: { type: String },
},
{ timestamps: true }
);

module.exports = model('Order', orderSchema);
