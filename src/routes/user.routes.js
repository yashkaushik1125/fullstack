import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: 'avtar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
        }
    ]),
    registerUser)
//router.route('/registers').get((req,res)=>{res.status(404).send(`<h1>working mate!!</h1>`)})

export default router