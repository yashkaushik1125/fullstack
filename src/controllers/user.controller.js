import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken'

const genrateAccessrefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(505, "something went wrong  Access not genrated", [
      error,
    ]);
  }
};

const registerUser = asynchandler(async (req, res) => {
  console.log(req.body , "body");
  const { email, fullName, username, password } = req.body;
  //

  if ([fullName, email, password, username].some((e) => e?.trim() === ""))
    throw new ApiError(400, "all feilds are required");

  const ExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (ExistedUser) {
    throw new ApiError(409, "User Exists Already");
  }
  const localAvtarPath = req.files?.avtar[0]?.path;
  const localCoverPath = req.files?.coverImage[0]?.path;
  console.log(localAvtarPath);

  if (!localAvtarPath) throw new ApiError(404, "Avtar file is required");

  const avtar = await uploadCloudinary(localAvtarPath);
  const coverImage = await uploadCloudinary(localCoverPath);

  if (!avtar) throw new ApiError(404, "Avtar is required");

  const myUser = await User.create({
    fullName,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username,
  });
  const createdUser = await User.findById(myUser._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "User not created , something went wrong");

  return res
    .status(200)
    .json(new apiResponse(200, createdUser, "user created succesfully"));
});

const loginUser = asynchandler(async (req, res) => {
  console.log(req.body);
  const { email, password, username } = req.body;
  if (!username && !email)
    throw new ApiError(400, "Email or username is required");

  const isPresent = await User.findOne({ $or: [{ email }, { username }] });
  if (!isPresent) throw new ApiError(404, "user doesnot exist");

  const isPasswordCorrect = await isPresent.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(404, "wrong Password");

  const { accessToken, refreshToken } = await genrateAccessrefreshToken(
    isPresent._id
  );
  console.log("working till 1");
  const loggedInUser = await User.findById(isPresent._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  const responseObj = {
    isPresent: loggedInUser,
    accessToken,
    refreshToken,
  };
  console.log("wjhyorking till 2");
  try {
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new apiResponse(200, loggedInUser, "UserLoggedIn Success"))
     ;
  } catch (error) {
    console.log(error);
    
  }
});

const logoutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };
  try {
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .send(new apiResponse(200, "Loggedut Success"));
  } catch (error) {
    console.log(error);
  }
});

const refreshAccessToken = asynchandler(async (req,res)=>{
  const incomingRefreshToken =   req.cokies.refreshToken || req.body.refreshToken
  if(!incomingRefreshToken)
    throw new ApiError(401 , 'Unauthorised baby')
  const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
  const user = await User.findById(decodedToken?._id)
  if(!user)throw new ApiError(401, 'invalid refresh token')
  if(incomingRefreshToken!==user.refreshToken) throw new ApiError(401,'refresh token expired')
  const options =
  {
   httpOnly:true,
   secure:true
  }
 const {accessToken,newrefreshToken} = await genrateAccessrefreshToken(user._id)
 return res
 .status(200)
 .cookie('accessToken',accessToken, options)
 .cookie('refreshToken',newrefreshToken,options)
 .json(new apiResponse(200,{accessToken,newrefreshToken},"accessTokenRefreshed"))
 

})
export { registerUser, loginUser, logoutUser, refreshAccessToken };
