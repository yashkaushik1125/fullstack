import express from 'express'
import connectDB from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'
dotenv.config({
    path:'./.env'
})


connectDB().then(()=>{app.listen(process.env.PORT||8000,(msg)=>{console.log(`hello db connected at 8000 ${msg}`)})})
.catch((err)=>console.log(err))








/*
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

*/