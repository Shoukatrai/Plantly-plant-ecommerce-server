import express from "express";
import { chatBoatAi } from "../controllers/chatboat.js";

const router = express.Router();
router.post("/planty_chat", chatBoatAi);

export default router;
