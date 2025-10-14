const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: () => new mongoose.Types.UUID().toString(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
