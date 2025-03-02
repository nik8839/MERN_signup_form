const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "userdata" } // 👈 Explicitly tell Mongoose to use 'userdata'
);

module.exports = mongoose.model("User", userSchema);