//utils import
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";


//model import
import  User  from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
  const { mail } = req.body;

  if (!mail) {
    throw new apiError(400, "Please provide mail");
  }

  const existingUser = await User.findOne({ mail });

  if (existingUser) {  
    return res
      .status(200)
      .json(new apiResponse(200, existingUser, "User already exists"));
  }

  const newUser = await User.create({ mail });

  res
    .status(201)
    .json(new apiResponse(201, newUser, "User created successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { mail } = req.body;
  // console.log("Login attempt for userId:", userId);
  // console.log("Request body:", req.body);

  // Validate required fields
  if (!mail) {
    throw new apiError(400, "Please provide mail");
  }

  // Find user by mail
  const user = await User.findOne({ mail })
  if (!user) {
    throw new apiError(404, "Invalid mail");
  }
  



  res.status(200).json(
    new apiResponse(
      200,
      { user },
      "User logged in successfully"
    )
  );
});
const updateUser = asyncHandler(async (req, res) => {
  const { mail } = req.body;

  if (!mail) {
    throw new apiError(400, "Please provide required fields");
  }

  const user = await User.findOneAndUpdate(
    { mail },
    { $inc: { credits: -1 } }, // ✅ DECREASE credits by 1
    { new: true }
  );

  if (!user) {
    throw new apiError(404, "User not found");
  }

  res
    .status(200)
    .json(new apiResponse(200, user, "Credits decreased successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
  });
  res.status(200).json(new apiResponse(200, {}, "User logged out successfully"));
});

const verifyToken = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log("Verifying token for user:", user);
  const userData = await User.findById(user._id);

  if (!userData) {
    throw new apiError(404, "User not found");
  }

  res.status(200).json(new apiResponse(200, { user : userData }, "Token is valid"));
});



export { createUser,  userLogin, verifyToken , logoutUser,updateUser};