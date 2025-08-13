import express from "express";
import path from "path";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, (msg) => {
      console.log(`hello db connected at ${process.env.PORT} ${msg} `);
    });
  })
  .catch((err) => console.log(err));

import { fileURLToPath } from "url";

// For ES modules (__dirname is not available by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

// Fallback to index.html for SPA routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
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
