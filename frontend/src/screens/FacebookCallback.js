import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../Slices/authSlice";

const FacebookCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFacebookLogin = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) return;

      try {
        const res = await axios.post("http://localhost:5000/api/auth/facebook", { code });        
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate("/Main");
      } catch (err) {
        console.error("Facebook login error:", err);
      }
    };

    handleFacebookLogin();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="text-center p-6 rounded-2xl shadow-lg bg-white">
        <h2 className="text-xl font-bold text-blue-600">Logging in with Facebook...</h2>
      </div>
    </div>
  );
};

export default FacebookCallback;
