import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/facebook", async (req, res) => {
  try {
    const { code } = req.body;

    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v12.0/oauth/access_token`, {
        params: {
          client_id: process.env.FACEBOOK_CLIENT_ID,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET,
          redirect_uri: "http://localhost:3000/facebook-callback",
          code,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const user = userResponse.data;

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.json({ user, token });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Facebook login failed" });
  }
});

export default router;
