import express from "express";
import { getAllContacts, getChatPartners, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router()
// router.get("/test", (req, res)=>{
//     res.send("Hi test success")
// });

// this middlewares execute in order -so requests get rate limited first, then authenticated. this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware
//요청을 너무 많이 보내는 사람은
// 로그인 확인 전에 먼저 막아서
// 서버 자원을 아끼는 구조다 
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;