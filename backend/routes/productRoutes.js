import express from "express";
import { authMiddleware, isAdmin } from "../middleware/middleware.js";
import Product from "../models/product.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = new Product({ name, price, description, category, image });
    await product.save();
    res.status(201).json({ msg: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// router.put("/:id/quantity", authMiddleware, isAdmin, async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     if (quantity == null || quantity < 0) {
//       return res.status(400).json({ msg: "Invalid quantity" });
//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { quantity },
//       { new: true }
//     );

//     if (!product) return res.status(404).json({ msg: "Product not found" });

//     res.json({ msg: "Quantity updated successfully", product });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, image },
      { new: true }
    );
    if (!product) res.status(404).json({ msg: "Product Not found" });
    res.json({ msg: "Product added", product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
