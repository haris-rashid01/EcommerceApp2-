import "../App.css";
import LoginSign from "../components/loginsign";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useContext } from "react";
import { GlobalFunctionContext } from "../context/functionsContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { handleSignUp, handleAbout } = useContext(GlobalFunctionContext);
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  useEffect(() => {});

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/auth/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
    credentials: "include",
  });

  const data = await res.json();
  setMessage(data.msg)

  if (res.ok) {
    dispatch(setCredentials({ user: data.user, token: data.token }));
    if (data.user.role === "admin" || data.user.role === "subadmin"  ) {
      navigate("/dash");
    } else {
      navigate("/Main");
    }
  }
};

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token,
      });

      dispatch(setCredentials({ user: res.data.user, token: res.data.token }));

      navigate("/Main", { state: { token: res.data.token } });
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const redirectToGitHub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23li99KjWyqAl1Vv37&scope=user`;
  };

  const redirectToFacebook = () => {
    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=1781925845748682&redirect_uri=http://localhost:3000/facebook-callback&scope=email,public_profile`;
  };
  

  return (
    <div
      className="loginPage"
      style={{ background: theme.background, color: theme.text }}
    >
      <Navbar onSignUp={handleSignUp} />
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="box">
          <label htmlFor="username">Enter your username</label>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div>
            {message}
          </div>

          <button className="loginButton" type="submit">
            Log in
          </button>
         

          <div className="login-page">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Error")}
            />
          </div>
          <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
            <button
              onClick={redirectToGitHub}
              style={{
                padding: "6px 12px",
                background: "#333",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
                style={{ width: "16px", height: "16px" }}
              />
              GitHub
            </button>
            <button
              onClick={redirectToFacebook}
              style={{
                padding: "6px 12px",
                backgroundColor: "#1877F2",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#166FE5")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1877F2")
              }
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                style={{ width: "16px", height: "16px" }}
              />
              Facebook
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
