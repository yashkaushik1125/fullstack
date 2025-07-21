import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from 'fs'

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUD_API_SECRET
    });


const uploadCloudinary = async (localPath)=>{

    try {
        if(!localPath) return null
         const respone await cloudinary.uploader.upload(localPath,{
            resource_type: "auto",
        })
        console.log('file has uploaded',respone );
        return(respone)
        
    } catch error() {
        fs.unlinkSync(localPath)
        return null
        
    }

}
 


export {uploadCloudinary}