const mongoose = require("mongoose");
const requiredMsg = "{PATH} is required.";

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
      unique: true
    },
    type: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."]
    },
    desc: {
      type: String,
      required: [true, requiredMsg],
      minlength: [3, "{PATH} must be at least {MINLENGTH} characters."]
    },
    skill1: {
      type: String
    },
    skill2: {
      type: String
    },
    skill3: {
      type: String
    },
    likeCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// register schema with mongoose and create the model, which will create a "post" collection when we insert to it
const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
