// const express =require('express');
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import masageRoutes from "./routes/masage.route.js";

const app = express(); 
dotenv.config()
const PORT = process.env.PORT || 3000
// console.log(process.env.PORT)

app.use("/api/auth", authRoutes);
app.use("/api/massages", masageRoutes);












app.listen(PORT, ()=>{
    console.log("서버가 정상 작동 중입니다: " , PORT)
})