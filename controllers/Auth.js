import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Auth.js";
export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    console.log(password);
    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists!",
        data: isUser,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPass,
      role,
    });

    res.status(200).json({
      message: "Signup successful",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User Not Found!",
        data: null,
      });
    }
    const verifyPass = await bcrypt.compare(password, user?.password);
    if (!verifyPass) {
      return res.status(400).json({
        status: false,
        message: "Wrong credentials!",
        data: null,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};
