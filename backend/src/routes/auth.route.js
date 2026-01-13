import express from "express"

const router = express.Router()
// SignUp, Login LogOut section
//   SignUp
router.get("/signup", (req, res) => {
  res.send("SignUp endpoint");
});

//   Login
router.get("/login", (req, res) => {
  res.send("Login endpoint");
});

//   LogOut
router.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});


export default router;