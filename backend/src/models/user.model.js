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
      ref: "ShortLink",
    },
  ],

}, { timestamps: true });



// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       mail: this.mail,
//       credits: this.credits, 
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };


const User = mongoose.model("User", userSchema);

export default User;
