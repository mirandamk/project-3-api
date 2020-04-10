const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  ice: [
    {
      name: [{
        type: String,
        required: true,
      }],
      tel_nr: [{
        type: String,
        required: true,
      }],
      email: [{
        type: String,
        required: true,
      }],
    }
  ],
  home_uni: { 
    type: String, 
    required: true 
  },
  exchange_uni: { 
    type: String, 
    required: true 
  },
  // username: { 
  //   type: String, 
  //   required: true 
  // },
  password: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  tel_nr: { 
    type: Number, 
    required: true 
  },
  address: [
    {
      street: [{
        type: String,
        required: true,
      }],
      postal_code: [{
        type: String,
        required: true,
    }],
    }],
});

const User = mongoose.model('users', userSchema);
module.exports = User;
