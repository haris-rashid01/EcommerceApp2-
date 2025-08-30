import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import "../App.css";

function AdminNavbar() {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className="navbar" style={{ background: theme.navbarBg, color: theme.text }}>
      <div className="brand">
        <a onClick={() => navigate("/admin")}>
          <img className="logo" src="/logo192.png" alt="logo" />
        </a>
        <h3>Admin Panel</h3>
      </div>

      <ul className="pages">
        <li onClick={() => navigate("/admin")}>Dashboard</li>
        <li onClick={() => navigate("/admin/users")}>Users</li>
        <li onClick={() => navigate("/admin/products")}>Products</li>
        <li onClick={() => navigate("/admin/orders")}>Orders</li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </li>
        <li>
          <button onClick={toggleTheme}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminNavbar;
