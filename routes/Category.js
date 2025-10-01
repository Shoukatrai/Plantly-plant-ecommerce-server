import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getSingleCategory,
} from "../controllers/Category.js";
import { authCheck, sellerCheck } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authCheck, sellerCheck, createCategory);

router.put("/:id", authCheck, sellerCheck, editCategory);

router.delete("/:id", authCheck, sellerCheck, deleteCategory);

router.get("/", getCategories);

router.get("/:id", getSingleCategory);

export default router;
