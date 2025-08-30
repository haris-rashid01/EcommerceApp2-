import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      category: String,
      price: Number,
      quantity: Number,
    },
  ],
  subtotal: Number,
  shipping: Number,
  total: Number,
  status: {
    type: String,
    default: "Pending", 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
