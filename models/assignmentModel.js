const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  explanation: { type: String, required: true },
  answer: { type: String, required: true },
});
const Assignment = mongoose.model('assignments', assignmentSchema);
module.exports = Assignment;
