// Extended Assignment Model with relations.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignSchema = new Schema({
  explanation: { type: String, required: true },
  answer: { type: String, required: true },
});
const Assign = mongoose.model('assign', assignSchema);
module.exports = Assign;
