import express from "express"
import { signup, login, logout, updateProfile} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router()
// SignUp, Login LogOut section
//   SignUp
router.post("/signup", signup );

//   Login
router.post("/login", login);

//   LogOut
router.post("/logout", logout);

// update profile logic
router.put("/update-profile", protectRoute,  updateProfile);

router.get("/check", protectRoute, (req, res)=>res.status(200).json(req.user))


export default router;