import express from 'express'


import connectDB from './db/index.js'
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})


connectDB()








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