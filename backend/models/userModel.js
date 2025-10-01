const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // e.g., Admin, Seller, Buyer
    bio: { type: String, required: true }, 
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);