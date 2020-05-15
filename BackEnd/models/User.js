const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    rol: {type: String, enum:[ 'admin', 'user' ], default: 'user'},
    name: { type: String },
    email: { type: String },
    facebookId: { type: String },
    googleId: { type: String },
    address: { type: String },
    telephone: { type: String},
    orders: [{ type: Schema.Types.ObjectId, ref: 'Orders' }]
  },
  { timestamps: true }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
