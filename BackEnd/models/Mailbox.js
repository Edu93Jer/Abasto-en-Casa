const { Schema, model } = require('mongoose');

const mailboxSchema = new Schema({
  name: { type: String },
  email: { type: String },
  telephone: { type: String },
  body: { type: String },
},
{ timestamps: true }
);

module.exports = model('Mailbox', mailboxSchema);
