const mongoose = require("mongoose");
require("dotenv").config();

const categoriesSchemale = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 100,
    required: [true, "You need to enter a name for the category!"],
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categoriesSchemale);
module.exports = { Category };
