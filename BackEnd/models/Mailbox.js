const { Schema, model } = require('mongoose');

const mailboxSchema = new Schema({
  name: { type: String },
  mail: { type: String },
  telephone: { type: String },
  body: { type: String },
},
{ timestamps: true }
);

module.exports = model('Mailbox', mailboxSchema);
