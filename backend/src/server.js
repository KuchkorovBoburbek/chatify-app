// const express =require('express');
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import masageRoutes from "./routes/masage.route.js";
import path from "path"
const app = express(); 
dotenv.config()

const __dirname = path.resolve()

const PORT = process.env.PORT || 3000
// console.log(process.env.PORT)
    
app.use("/api/auth", authRoutes);
app.use("/api/massages", masageRoutes);
// make ready for deployment 
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist"))) 

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}













app.listen(PORT, ()=>{
    console.log("서버가 정상 작동 중입니다: " , PORT)
})