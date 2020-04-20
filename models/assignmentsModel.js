const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema({
 dimension:{
  type: String,
  enum: [
    "power-distance", 
    "individualism-collectivism", 
    "masculinity-feminity", 
    "uncertainty-avoidance",
    "long-term-orientation", 
    "indulgence-restraint" ],
 },
 description: {
   type: String,
 },
 image: {
   type: String, 
 }
});
const Assignments = mongoose.model('assignments', assignmentsSchema);
module.exports = Assignments;

