import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
    
}))

app.use(express.json({limit:'10kb'}))
app.use(express.urlencoded({extended: true , limit:'10kb'}))
app.use(express.static('public'))
app.use(cookieParser())


//routessssssss

import userRouter from './routes/user.routes.js'


app.use('/api/v1/users',userRouter)

export {app}