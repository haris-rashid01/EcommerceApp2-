import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../components/adminNavbar";
import { logout } from "../Slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

function AdminDashboard() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const { theme } = useContext(ThemeContext);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    quantity: 1,
  });

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Products fetch failed:", err));

    if (user.role === "admin") {
      fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUsers(Array.isArray(data) ? data : []))
        .catch((err) => console.error("Users fetch failed:", err));
    }

    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Orders fetch failed:", err));
  }, [token, user.role]);

  useEffect(() => {
    const handlePopState = () => {
      dispatch(logout());
      navigate("/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate, location]);

  if (!user || (user.role !== "admin" && user.role !== "subadmin")) {
    return <p style={{ textAlign: "center" }}>Access Denied</p>;
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      setMessage(data.msg);
      if (res.ok) {
        setProducts((prev) => [...prev, data.product || data]);
      }
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        quantity: 1,
      });
    } catch (err) {
      console.error("Add product failed:", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.json();
      setMessage(data.msg);

      if (res.ok) setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete product failed:", err);
    }
  };

  // const handleQuantityUpdate = async (id, quantity) => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/api/products/${id}/quantity`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ quantity }),
  //       }
  //     );
  //     const data = res.json();
  //     setMessage(data.msg);
  //     if (res.ok) {
  //       setProducts(
  //         products.map((p) => (p._id === id ? { ...p, quantity } : p))
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Update quantity failed:", err);
  //   }
  // };

  const handleAssignRole = async (userId, role) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        }
      );
      if (res.ok) {
        setUsers(users.map((u) => (u._id === userId ? { ...u, role } : u)));
      }
    } catch (err) {
      console.error("Assign role failed:", err);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingProduct),
        }
      );

      const data = await res.json();
      setMessage(data.msg);

      if (res.ok) {
        setProducts(
          products.map((p) => (p._id === editingProduct._id ? data.product : p))
        );
        setEditingProduct(null);
      }
    } catch (err) {
      console.error("Update product failed:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <AdminNavbar />
      <div
        style={{
          color: "black",
          fontWeight: 600,
          textAlign: "center",
          padding: "5px",
        }}
      >
        {user.role}
        {message}
      </div>
      <div style={{ maxWidth: "1200px", margin: "20px auto", width: "100%" }}>
        <h2 style={{ marginBottom: "10px", color: "#333" }}>Products</h2>
        <form
          onSubmit={handleAddProduct}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <input
            style={inputStyle}
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
          <input
            style={inputStyle}
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
          />

          <input
            style={inputStyle}
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <input
            style={{ ...inputStyle, maxWidth: "120px" }}
            type="number"
            placeholder="Qty"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            min={1}
          />
          <button style={btnStyle} type="submit">
            Add
          </button>
        </form>

        <ul style={listStyle}>
          {products.map((p) => (
            <li key={p._id} style={listItemStyle}>
              {editingProduct && editingProduct._id === p._id ? (
                <form
                  onSubmit={handleUpdateProduct}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <input
                    style={inputStyle}
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    style={inputStyle}
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    style={inputStyle}
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                  style={inputStyle}
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        quantity: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    style={inputStyle}
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    style={inputStyle}
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.value,
                      })
                    }
                  />
                  <button style={btnStyle} type="submit">
                    Save
                  </button>
                  <button
                    style={{ ...btnStyle, background: "gray" }}
                    type="button"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span style={{ flex: 1, overflowWrap: "break-word" }}>
                    <b>{p.name}</b> - ${p.price} - {p.category} - Quantity: {p.quantity}
                  </span>
                  <button
                    style={{
                      ...btnStyle,
                      background: "#ffc107",
                      color: "#000",
                    }}
                    onClick={() => setEditingProduct(p)}
                  >
                    Edit
                  </button>
                  {user.role === "admin" && (
                    <button
                      style={{ ...btnStyle, background: "#dc3545" }}
                      onClick={() => handleDeleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        {user.role === "admin" && (
          <>
            <h2 style={{ marginTop: "30px", color: "#333" }}>Users</h2>
            <ul style={listStyle}>
              {users.map((u) => (
                <li key={u._id} style={listItemStyle}>
                  <span style={{ flex: 1 }}>
                    {u.name || u.email} ({u.role})
                  </span>
                  <select
                    style={{ ...inputStyle, maxWidth: "150px" }}
                    value={u.role}
                    onChange={(e) => handleAssignRole(u._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="subadmin">Sub-admin</option>
                    <option value="admin">Admin</option>
                  </select>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 style={{ marginTop: "30px", color: "#333" }}>Orders</h2>
        <ul style={listStyle}>
          {orders.map((o) => (
            <li
              key={o._id}
              style={{
                ...listItemStyle,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div>
                <b>Order ID:</b> {o._id}
              </div>
              <div>
                <b>Order by:</b> {o.user?.name || o.user?.email || "Unknown"}
              </div>
              <div>
                <b>Status:</b> {o.status}
              </div>
              <div>
                <b>Subtotal:</b> ${o.subtotal}
              </div>
              <div>
                <b>Shipping:</b> ${o.shipping}
              </div>
              <div>
                <b>Total:</b> ${o.total}
              </div>
              <div>
                <b>Created At:</b> {new Date(o.createdAt).toLocaleString()}
              </div>

              <div style={{ marginTop: "10px" }}>
                <b>Items:</b>
                <ul style={{ marginTop: "5px", paddingLeft: "15px" }}>
                  {o.items?.map((i, idx) => (
                    <li key={idx}>
                      {i.name} ({i.category}) - ${i.price} × {i.quantity} = $
                      {i.price * i.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  flex: "1",
};

const btnStyle = {
  padding: "8px 15px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  marginTop: "10px",
  maxWidth: "100%",
};

const listItemStyle = {
  background: "#fff",
  padding: "10px 15px",
  marginBottom: "10px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
  width: "100%",
};

export default AdminDashboard;
