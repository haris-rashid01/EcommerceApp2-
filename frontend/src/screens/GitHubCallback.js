import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "../Slices/authSlice";
import "../App.css";

const GitHubCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGitHubCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) return;

      try {
        const res = await axios.post("http://localhost:5000/api/auth/github", { code });
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate("/Main");
      } catch (err) {
        console.error("GitHub login error:", err);
      }
    };

    handleGitHubCallback();
  }, [dispatch, navigate]);

  return (
      <div>
      <div className="spinner"></div>
    </div>
  )
};


export default GitHubCallback;
