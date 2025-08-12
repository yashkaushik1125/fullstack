import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import bodyParser from "body-parser";


const jsonParser = bodyParser.json()
const formParser = bodyParser.raw()


const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avtar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(jsonParser,loginUser);
router.route('/refresh-token').post(refreshAccessToken)

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
