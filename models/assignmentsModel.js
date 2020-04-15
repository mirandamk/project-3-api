const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema({
  // picture: { type: String, required: true },
  // answer: { type: String, required: true },
  answerMasculinity: { type: String },
  masculinityImageUrl: { type: String, required: true },
  // photoMasculinity: {type: String }
  // student_id: {type: ObjectId, ref:"User"},
  // assignment_type: {type: String, enum: ["masculinity", "hierarchy"]}
});
const Assignments = mongoose.model('assignments', assignmentsSchema);
module.exports = Assignments;



// movies: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'movies',
//   },
// ],
