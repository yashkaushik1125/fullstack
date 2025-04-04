import express from 'express'
import mongoose from 'mongoose'
import { DB_NAME } from './constants'
import e from 'express';
const app = express()
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{console.log("error : ",error);
            throw(error)
        })
        app.listen(process.env.PORT, ()=>{
            console.log('app is listning on port : ',process.env.PORT);
            
        })


        
    } catch (error) {
        console.error("error: ",error);
        
    }

})()