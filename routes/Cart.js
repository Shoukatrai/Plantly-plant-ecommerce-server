import express from "express";
import { addToCart } from "../controllers/Cart.js";
import { authCheck } from "../middlewares/auth.js";
const router = express.Router();

router.post("/", authCheck, addToCart);

export default router;
