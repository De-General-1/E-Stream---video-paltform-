import express from "express";
import { forgotPassword, logout, passwordReset, signin, signup, verifyEmail } from "../controllers/auth.js";

const router = express.Router();


//Create a User
router.post("/signup", signup )

//Verity user email
router.get("/:id/verifyEmail/:token", verifyEmail )

//SIGN IN
router.post("/signin", signin)

//Logout
router.get("/logout", logout)

//forgot password
router.post("/forgotPassword", forgotPassword)

//Rest password
router.patch("/resetPassword/:token", passwordReset)

//GOOGLE AUTH
router.post("/google", )
export default router;