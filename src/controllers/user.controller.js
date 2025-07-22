import { asynchandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apiError.js'
import {User} from '../models/user.model.js'
import { uploadCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";


const registerUser = asynchandler(async (req, res)=>{
    const {email , fullName , username , password }=req.body
   //
    console.log(req.body)

    if([fullName,email,password,username].some((e)=>e?.trim()===""))
        throw new ApiError (400,"all feilds are required")

  const ExistedUser= await User.findOne({
        $or:[{username} , {email}]
    })
    if(ExistedUser){ 
        throw new ApiError(409,"User Exists Already");
       }
    const localAvtarPath = req.files?.avtar[0]?.path;
    const localCoverPath = req.files?.coverImage[0]?.path;
    console.log(localAvtarPath);
    

    if(!localAvtarPath) throw new ApiError(404,'Avtar file is required')
        
   const avtar= await uploadCloudinary(localAvtarPath)
   const coverImage = await  uploadCloudinary(localCoverPath)

   if(!avtar) throw new ApiError(404, "Avtar is required")

  const myUser= await User.create({
        fullName,
        avtar:avtar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username
    })
   const createdUser = await User.findById(myUser._id).select(
    "-password -refreshToken"
   )
   if(!createdUser) throw new ApiError(500,'User not created , something went wrong')

    return res.status(200).json(new apiResponse(200,createdUser,'user created succesfully'))
    
})

export {registerUser}