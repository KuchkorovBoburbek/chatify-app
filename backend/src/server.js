// const express =require('express');
import express from "express"
import authRoutes from "./routes/auth.route.js"
import masageRoutes from "./routes/masage.route.js";
import path from "path"
import { connetDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
const app = express(); 
import cookieParser from "cookie-parser";
import cors from "cors"
const __dirname = path.resolve()

const PORT = ENV.PORT || 3000;


// console.log(process.env.PORT)
app.use(express.json()) // req.body
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}))
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/massages", masageRoutes);
// make ready for deployment 
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}













app.listen(PORT, ()=>{
    console.log("서버가 정상 작동 중입니다: " , PORT);

    connetDB();
})