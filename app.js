import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import cors from "cors";
// Import Routes
// import productRoutes from "./routes/Product.js";
import categoryRoutes from "./routes/Category.js";
import userRoutes from "./routes/User.js";
import chatRoutes from "./routes/chat.js";
// import orderRoutes from "./routes/Order.js";
// import cartRoutes from "./routes/Cart.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Use Routes
// app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
