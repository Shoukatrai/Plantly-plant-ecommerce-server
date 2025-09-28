import express from "express";
import { createProduct, deleteProduct, editProduct, getProducts, getSingleProduct } from "../controllers/Category.js";
const router = express.Router();
router.post("/", createProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);
router.get("/all-categories", getProducts);
router.get("/:id", getSingleProduct);

export default router;