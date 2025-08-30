import React, { useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/button";
import { ThemeContext } from "../context/themeContext";
import cart from "../constants/cart.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Slices/authSlice";
import { clearCart } from "../Slices/cartSlice";

const Navbar = ({ onLogin, onSignUp, onAbout, onContact, navRef }) => {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());

    navigate("/");
  };

  return (
    <div
      ref={navRef}
      className="navbar"
      style={{ background: theme.navbarBg, color: theme.text }}
    >
      <div className="brand">
        <a onClick={() => navigate("/")}>
          <img
            style={{ cursor: "pointer" }}
            className="logo"
            src="/logo192.png"
            alt="no-image"
          />
        </a>
        <h3>React Commerce</h3>
      </div>

      <ul className="pages">
        <li onClick={() => navigate("/")}>
          <a>Home</a>
        </li>
        <li onClick={onContact}>
          <a>Contact</a>
        </li>
        <li onClick={onAbout}>
          <a>About</a>
        </li>

        {isAuthenticated && (
          <li>
            <img
              onClick={() => navigate("/CartScreen")}
              style={{ height: "30px", width: "30px", cursor: "pointer" }}
              src={cart}
              alt="cart"
            />
          </li>
        )}

        {!isAuthenticated ? (
          <>
            <li>
              <CustomButton label="Login" onClick={onLogin} />
            </li>
            <li>
              <CustomButton label="Sign Up" onClick={onSignUp} />
            </li>
          </>
        ) : (
          <li>
            <CustomButton label="Logout" onClick={handleLogout} />
          </li>
        )}

        <button
          onClick={toggleTheme}
          className="btn"
          style={{
            background: theme.buttonBg,
            color: theme.buttonText,
            marginLeft: "30px",
          }}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </ul>
    </div>
  );
};

export default React.memo(Navbar);
