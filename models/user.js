const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Deep1');

const userscema=mongoose.Schema({
  name: String,
  image: String,
  email: String,
})

module.exports= mongoose.model('User', userscema);