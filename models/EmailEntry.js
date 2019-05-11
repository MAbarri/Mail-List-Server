const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let EmailEntry = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  niche: {
    type: String
  }
},{
    collection: 'emaillist'
});

module.exports = mongoose.model('EmailEntry', EmailEntry);
