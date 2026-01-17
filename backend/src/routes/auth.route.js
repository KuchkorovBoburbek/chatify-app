import express from "express"
import { signup } from "../controllers/auth.controller.js";

const router = express.Router()
// SignUp, Login LogOut section
//   SignUp
router.post("/signup", signup );

//   Login
router.get("/login", (req, res) => {
  res.send("Login endpoint");
});

//   LogOut
router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});


export default router;