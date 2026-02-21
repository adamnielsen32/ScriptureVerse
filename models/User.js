import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
