import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/middleware.js";
import passport from "passport";

const router = express.Router();

router.get("/Main", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to main page", userId: req.user.id });
});

router.post("/SignUp", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
      role: role || "user", 
    });

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token, 
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.post("/Logout", (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
});

// router.get("/check", (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({ msg: "No token found" });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         res.status(200).json({ msg: "Token valid", user: decoded });
//     } catch (err) {
//         res.status(401).json({ msg: "Token expired or invalid" });
//     }
// });

export default router;
