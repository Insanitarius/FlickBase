const mongoose = require("mongoose");
require("dotenv").config();
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 50,
    required: ["true", "You need a title"],
  },
  content: {
    type: String,
    required: ["true", "You need some content"],
  },
  excerpt: {
    type: String,
    required: ["true", "Please add an excerpt"],
    maxLenght: 250,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 2;
      },
      message: "You must add atleast 2 actors",
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "public"],
    default: "draft",
    index: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };
