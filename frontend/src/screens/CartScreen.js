import React from "react";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} from "../Slices/cartSlice";
import { useNavigate } from "react-router-dom";

function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart) || [];

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

const { token, user } = useSelector((state) => state.auth);

const handleCheckout = async () => {
  if (!user || !token) {
    alert("Please login to place an order!");
    return;
  }

  const orderData = {
    items: cart.map((item) => ({
      productId: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
    subtotal,
    shipping,
    total,
  };

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Order placed successfully!");
    dispatch(clearCart());
    navigate("/Main");
  } else {
    alert(data.message || "Order failed");
  }
};


  return (
    <div>
      <Navbar />
      <div className="heading">
        <h1>My Cart</h1>
      </div>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty</p>
      ) : (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.name}</strong>
                    <p>{item.category}</p>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                    >
                      -
                    </button>
                    <button onClick={() => dispatch(removeFromCart(item._id))}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ padding: "30px" }}>
            <label htmlFor="coupon">Enter your coupon</label>
            <input
              placeholder="Coupon"
              style={{
                border: "2px solid black",
                borderRadius: "6px",
                marginLeft: "10px",
              }}
              type="text"
              name="coupon"
            />

            <div style={{ padding: "40px" }}>
              <h4>Cart Subtotal: ${subtotal.toFixed(2)}</h4>
              <h4>Shipping: ${shipping.toFixed(2)}</h4>
              <hr />
              <h4>You Pay: ${total.toFixed(2)}</h4>
              <button
                style={{
                  background: "#0097a3",
                  borderRadius: "10px",
                  padding: "10px",
                  color: "white",
                  marginTop: "15px",
                }}
                type="button"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              <button
                style={{
                  background: "red",
                  borderRadius: "10px",
                  padding: "10px",
                  color: "white",
                  marginLeft: "10px",
                  marginTop: "15px",
                }}
                type="button"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
