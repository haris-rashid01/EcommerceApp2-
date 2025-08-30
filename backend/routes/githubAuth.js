import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/auth/github", async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: "No code provided" });

  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    const githubUser = userResponse.data;

    const jwtToken = jwt.sign(
      { id: githubUser.id, username: githubUser.login, email: githubUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.json({ token: jwtToken, user: githubUser });
  } catch (err) {
    console.error("GitHub OAuth error:", err);
    res.status(500).json({ message: "GitHub login failed" });
  }
});

export default router;
