import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import ShortLink from "../models/shortLink.model.js";

export const createShortLink = asyncHandler(async (req, res) => {
  const { originalUrl, shortCode ,mail } = req.body;

  if (!originalUrl || !shortCode || !mail) {
    throw new apiError(400, "Please provide all required fields");
  }

  const existingLink = await ShortLink.findOne({ shortCode });
  if (existingLink) {
    throw new apiError(409, "Short code already in use");
  }

  const newShortLink = new ShortLink({ originalUrl, shortCode,owner:mail });
  await newShortLink.save();

  res.status(201).json(new apiResponse(201, newShortLink, "Short link created successfully"));
});

export const getShortLink = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  // Find short link by code
  const shortLink = await ShortLink.findOne({ shortCode });
  if (!shortLink) {
    throw new apiError(404, "Short link not found");
  }

  // Increment click count
  shortLink.clicks += 1;
  await shortLink.save();

  res.redirect(shortLink.originalUrl);
});

export const deleteShortLink = asyncHandler(async (req, res) => {
  const { shortCode,user } = req.body;

  const shortLink = await ShortLink.findOneAndDelete({ $and : [{ shortCode }, {owner:user._id}] });
  if (!shortLink) {
    throw new apiError(404, "Short link not found");
  }

  res.status(200).json(new apiResponse(200, null, "Short link deleted successfully"));
});
export const getAllShortLinks = asyncHandler(async (req, res) => {
   const { mail,page } = req.body;
    const limit = 10;
    const skip = (page - 1) * limit;
    const totalLinks = await ShortLink.countDocuments({ owner:mail });
  const shortLinks = await ShortLink.find({ owner:mail }).skip(skip).limit(limit).exec();
  res.status(200).json(new apiResponse(200, {shortLinks,totalLinks}, "Short links retrieved successfully"));
});

