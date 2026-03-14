const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  market: {
    type: String,
    required: true
  },

  validationScore: {
    type: Number
  },

  analysis: {
    type: Object
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Idea", ideaSchema);