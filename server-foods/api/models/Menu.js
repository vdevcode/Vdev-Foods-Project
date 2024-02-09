const mongoose = require("mongoose");
const { Schema } = mongoose;

//tao object cho menu
const menuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  category: String,
  price: Number,
  createAt: {
    type: Date,
    default: Date.now
  } 
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
