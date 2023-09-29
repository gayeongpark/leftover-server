const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  emailToken: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  resetPasswordEmailToken: {
    type: Number,
  },
});

const Auth = model("Auth", authSchema);
module.exports = Auth;
