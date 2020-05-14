const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  paid: { type: Boolean, default: false },
  date: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  shippingAddress: { type: Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true }
);

module.exports = model('Order', orderSchema);
