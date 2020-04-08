// Extended User Model with relations.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  }
);
const User = mongoose.model('users', userSchema);
module.exports = User
