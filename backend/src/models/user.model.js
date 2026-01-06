import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  credits: {
    type: Number,
    default: 100,
  },
  shortLinks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shortLink",
    },
  ],

}, { timestamps: true });

// Methods for plain text password
userSchema.methods.isPasswordCorrect = function (password) {
  return password === this.password;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userId: this.userId,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Create model AFTER adding methods
const User = mongoose.model("User", userSchema);

export default User;
