import express from "express";
import Order from "../models/Order.js";
import { verifyUser } from "../middleware/middleware.js";

const router = express.Router();

router.post("/", verifyUser, async (req, res) => {
  const { items, subtotal, shipping, total } = req.body;

  try {
    const newOrder = new Order({
      user: req.user._id, 
      items,
      subtotal,
      shipping,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
