import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import  User  from "../models/user.model.js";

const verifyJwt = asyncHandler(async (req, _res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.split(" ")[1];

  if (!token) {
    throw new apiError(401, "Authentication required");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch {
    throw new apiError(401, "Invalid or expired token");
  }

  const user = await User.findById(decodedToken._id).select(
    "-password "
  );

  if (!user) {
    throw new apiError(401, "User not found");
  }

  req.user = user;
  next();
});

export default verifyJwt;
