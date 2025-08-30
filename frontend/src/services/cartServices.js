import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const fetchCart = async (userId) => {
  const res = await axios.get(`${API}/${userId}`, { withCredentials: true });
  return res.data;
};

export const addToCartAPI = async (userId, productId, quantity = 1) => {
  const res = await axios.post(`${API}/add`, { userId, productId, quantity }, { withCredentials: true });
  return res.data;
};

export const removeFromCartAPI = async (userId, productId) => {
  const res = await axios.post(`${API}/remove`, { userId, productId }, { withCredentials: true });
  return res.data;
};

export const decreaseQuantityAPI = async (userId, productId) => {
  const res = await axios.post(`${API}/decrease`, { userId, productId }, { withCredentials: true });
  return res.data;
};

export const clearCartAPI = async (userId) => {
  const res = await axios.post(`${API}/clear`, { userId }, { withCredentials: true });
  return res.data;
};
