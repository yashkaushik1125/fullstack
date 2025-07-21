import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/registers').get((req,res)=>{res.status(404).send(`<h1>working mate!!</h1>`)})

export default router