const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema({
  picture: { type: String, required: true },
  answer: { type: String, required: true },
  // Taken from E's previous project model to compare with Jurgens "student_id"
  // owner: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'users',
  // },
  //Keys that Jurgen helped us with writing.
  // student_id: {type: ObjectId, ref:"User"},
  // assignment_type: {type: String, enum: ["masculinity", "hierarchy"]}
});
const Assignments = mongoose.model('assignments', assignmentsSchema);
module.exports = Assignments;
