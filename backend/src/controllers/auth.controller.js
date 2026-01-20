import validator from "validator";
import User from "../models/user.js"
import bcrypt from "bcryptjs";
import {generateToken} from '../lib/utils.js'
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

import { ENV } from "../lib/env.js";

// < signup logic   
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const name = typeof fullName === "string" ? fullName.trim() : "";
  const normalizeEmail = typeof email === "string" ? email.trim().toLowerCase(): "";
  const pass = typeof password === "string" ? password : ""; 

  try {
    if (!name || !normalizeEmail || !pass) {
      return res.status(400).json({ massage: "All fields are required" });
    }
    if (pass.length < 6) {
      return res
        .status(400)
        .json({ massage: "Password must be at least 6 charters " });
    }
    if (!validator.isEmail(normalizeEmail)) {
      return res.status(400).json({ massage: "Invalid email format" });
    }
     
    const existing = await User.findOne({ email: normalizeEmail });
    if (existing) {
      return res.status(409).json({ massage: "Email alredy exists" });
    }

    // 123456 => $liskdjf_?dsldkjf
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pass,salt)

    const newUser = new User({
      fullName: name,
      email: normalizeEmail,
      password: hashedPassword,
    });

    if(newUser){
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
         _id: newUser._id,
         fullName: newUser.fullName,
         email: newUser.email,
         profilePic: newUser.profilePic,
      })
     // todo: send a welcome email to user 
       try {
         await sendWelcomeEmail(
           savedUser.email,
           savedUser.fullName,
           ENV.CLIENT_URL
         );
       } catch (error) {
        console.log("Failed to send welcome email")
       }
    }else{
        res.status(400).json({massage: "Invalid user data", error})
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({massage: "Internal servfer error"})
  }
};
// signup logic > 

// < login logic
export const login = async (req, res) => {
   const {email, password} = req.body;

   if (!email || !password) {
    return res.status(400).json({massage: "Email and password are required"})
   }
     try {
       const user = await User.findOne({ email });
       if (!user)
         return res
           .status(400)
           .json({ massage: "Invalid credentials (email)" });
       //never tell the client which one is incorrect: password or email
       console.log("first");
       const isPassworCorrect = await bcrypt.compare(password, user.password);
       if (!isPassworCorrect)
         return res
           .status(400)
           .json({ massage: "Invalid credentials (password)" });
       console.log("first2");
       generateToken(user._id, res);

       res.status(200).json({
         _id: user._id,
         fullName: user.fullName,
         email: user.email,
         profilePic: user.profilePic,
       });
     } catch (error) {
       console.error("Error in logic controller: ", error);
       res.status(500).json({ massage: "Internal server Error" });
     }
}


//login logic > 

// < logout logic
export const logout = async (_, res) => {
  res.cookie("jwt", "", {maxAge:0})
  res.status(200).json({massage: "Logged out successfully"})
}
//logout logic >

