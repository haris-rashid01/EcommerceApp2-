import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import googleAuthRoutes from "./routes/googleAuth.js";
import githubAuthRoutes from "./routes/githubAuth.js";
import facebookAuthRoutes from "./routes/facebookAuth.js";
import dotenv from "dotenv";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express()


app.use(session({secret:"mysecret", resave:false, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log("MongoDB connected")).catch(err => console.error(err));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", googleAuthRoutes);
app.use("/api", githubAuthRoutes);
app.use("/api/auth", facebookAuthRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);


const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)
)