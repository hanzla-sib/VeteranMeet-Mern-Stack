const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Veteranschema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  profession: {
    type: String
  },
  photo:{
    type: String,
    default : null
  },
  hobbies: [{type: String}],
  interested_events: [{type: String}],
  followings: [{type: String}],
  followers :[{type: String}],
  myEvents :[{Eventname:{type:String},Eventtime:{type:String}}],
  stars:{ type: Number,
    default : 0},
    starCategory:{
      type: String
    },
    Posts:[{content:{type: String}, media:{type: String}, Date:{type: Date},username:{type:String}}],
}, {
    collection: 'Veteran'
  })
module.exports = mongoose.model('Veteran2', Veteranschema)