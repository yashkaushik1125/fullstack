import { asynchandler } from "../utils/asyncHandler.js";
const registerUser = asynchandler(async (req, res)=>{
    const {email , fullName , username , password }=req.body
    console.log(email)
    res.status(200).send('ok')
    
    
})

export {registerUser}