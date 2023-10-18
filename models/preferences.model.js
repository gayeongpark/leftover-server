const { Schema, model } = require("mongoose");

const preferencesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    allergies: {
      type: [String],
      // required: true,
    },
    cook: {
      type: [String],
      // required: true,
    },
    diet: {
      type: [String],
      // required: true,
    },
  },
  { timestamps: true }
);

const Preferences = model("Preferences", preferencesSchema);
module.exports = Preferences;
