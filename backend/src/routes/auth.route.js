import express from "express"
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router()
// SignUp, Login LogOut section
//   SignUp
router.post("/signup", signup );

//   Login
router.post("/login", login);

//   LogOut
router.post("/logout", logout);


export default router;