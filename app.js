import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const app = express();
export const Prisma = new PrismaClient();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
