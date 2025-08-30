import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  role: { type: String, enum: ["user", "admin", "subadmin"], default: "user" }, 
});

const User = mongoose.model("User", userSchema);
export default User;
