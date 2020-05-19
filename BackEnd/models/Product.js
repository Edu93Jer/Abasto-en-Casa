const { Schema, model } = require('mongoose')

const productSchema = new Schema({
 name: { type: String },
 department: { type: String },
 imgURL: { type: String },
 price:  {type: Number},
 quantity: { type: Number, default: 0 },
 measurement: { type: String, enum: [ 'Kilo', 'Gramos', 'Litro', 'Mililitros', 'Pieza' ]},
 description: { type: String, max: 100 }
},
{ timestamps: true }
)

module.exports = model('Product', productSchema);