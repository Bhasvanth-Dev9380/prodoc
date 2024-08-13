import { Router  } from "express";

import { login,logout,signup,getUser } from "../controllers/user.controllers.js";

const router = Router();


router.route("/login")
.post(login)


router.route("/register")
.post(signup)

router.route("/logout")
.post(logout)


router.route("/profile")
.get(getUser)


export default router;