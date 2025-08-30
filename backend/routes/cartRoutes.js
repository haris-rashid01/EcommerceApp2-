import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartControllers.js"
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);

export default router;
