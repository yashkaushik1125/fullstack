import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorised request");

    const decoedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "inva;id access token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, "something went wronmg");
  }
});
