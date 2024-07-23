var mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
  });
  
let DateModel = mongoose.model('DateModel', dateSchema);
module.exports = DateModel

