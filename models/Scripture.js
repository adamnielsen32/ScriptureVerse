import mongoose from "mongoose";

const scriptureSchema = new mongoose.Schema({
  book: { type: String, required: true },
  bookName: { type: String, required: true },
  chapter: { type: Number, required: true },
  verse: { type: String, required: true },
  text: { type: String, required: true },
  insight: { type: String },
  doctrine: { type: String },
  crossReferences: [String],
  userId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Scripture", scriptureSchema);
