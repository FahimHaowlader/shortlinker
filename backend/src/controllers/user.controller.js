//utils import
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";


//model import
import  User  from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
  try {
    const {role :adminRole }  = req.user;
    // console.log("Admin Role:", adminRole  );
    // Only admin can create users
    if (adminRole !== "admin") {
      throw new apiError(403, "Only admin can create users");
    }
    const {user} = req.body;
    const { userId, password,role } = user;

    // Validate required fields
    if (!userId || !password || !role)  {
      throw new apiError(400, "Please provide all required fields");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      throw new apiError(409, "User with this userId already exists");
    }

    // Create new user
    const newUser = new User(user)
    await newUser.save();

    res.status(201).json(new apiResponse(201, newUser, "User created successfully"));
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  // console.log("Login attempt for userId:", userId);
  // console.log("Request body:", req.body);

  // Validate required fields
  if (!userId || !password) {
    throw new apiError(400, "Please provide userId and password");
  }

  // Find user by userId
  const user = await User.findOne({ userId }).select("+password");
  if (!user) {
    throw new apiError(401, "Invalid userId or password");
  }
  // console.log("User found:", user);
  // Check if user has access
  if (!user.access) {
    throw new apiError(403, "Your account does not have access");
  }

  // Check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Invalid userId or password");
  }

  // Generate access token
  const accessToken = user.generateAccessToken();

  // Set token in secure HTTP-only cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,      // Cannot be accessed by JS (prevents XSS)
    secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
    sameSite: "Strict",  // CSRF protection
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 day in milliseconds
  });

  // Optional: return minimal user info
  const userInfo = {
    userId: user.userId,
    role: user.role,
    access: user.access,
  };

  res.status(200).json(
    new apiResponse(
      200,
      { user: userInfo },
      "User logged in successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
  });
  res.status(200).json(new apiResponse(200, {}, "User logged out successfully"));
});

const verifyToken = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json(new apiResponse(200, { user }, "Token is valid"));
});



export { createUser,  userLogin, verifyToken , logoutUser};