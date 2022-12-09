const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CommunitySchema = new Schema({
  Orgname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  myEvents :[{Eventname:{type:String},Eventtime:{type:String},invitation:[{email:{type:String}}]}],
}, {
    collection: 'Community'
  })
module.exports = mongoose.model('Community2', CommunitySchema)