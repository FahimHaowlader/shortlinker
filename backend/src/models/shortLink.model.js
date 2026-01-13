import mongoose from "mongoose";

const shortLinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: {
    type:String,
    required: true,
  },
}, { timestamps: true });


const ShortLink = mongoose.model("ShortLink", shortLinkSchema);

export default ShortLink;