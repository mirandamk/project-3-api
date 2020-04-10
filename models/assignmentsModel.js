const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema({
  // pictureMasculinity: { type: String, required: true },
  answerMasculinity: { type: String, required: true },
  //answerIndividualism: { type: String, required: true },
});
const Assignments = mongoose.model('assignments', assignmentsSchema);
module.exports = Assignments;
