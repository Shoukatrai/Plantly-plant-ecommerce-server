import express from "express";
import { createOrder } from "../controllers/Order.js";
import { authCheck } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authCheck, createOrder);

export default router;
