const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hofstedeSchema = new Schema({
    name: String,
    image: String,
});

const Countries = mongoose.model('countries', hofstedeSchema);
module.exports = Countries;
