import { Prisma } from "../app.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const isUser = await Prisma.user.findUnique({
      where: { email },
    });

    if (isUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await Prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPass,
      },
    });

    res.status(200).json({
      message: "Signup successful",
      data: user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      return res.status(400).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
