import jwt from "jsonwebtoken";
import User from "../models/Auth.js";

export const authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        status: false,
        data: null,
        message: "No token provided!",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded", decoded);
    const user = await User.findById(decoded.id);
    console.log("user", user);
    if (!user) {
      return res.status(403).json({
        status: false,
        data: null,
        message: "Invalid token!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      status: false,
      data: null,
      message: "Unauthorized!",
    });
  }
};

export const sellerCheck = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      status: false,
      data: null,
      message: "Access denied: Sellers only!",
    });
  }
  next();
};

export const adminCheck = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};
