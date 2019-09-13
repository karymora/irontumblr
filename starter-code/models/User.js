const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  imgName: String,
  imgPath: String,
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);