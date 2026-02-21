import Scripture from "../models/Scripture.js";

// Get all scriptures
export const getAllScriptures = async (req, res) => {
  try {
    const scriptures = await Scripture.find();
    res.json(scriptures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get scripture by ID
export const getScriptureById = async (req, res) => {
  try {
    const scripture = await Scripture.findById(req.params.id);
    if (!scripture) {
      return res.status(404).json({ error: "Scripture not found" });
    }
    res.json(scripture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new scripture
export const createScripture = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const body = { ...req.body, userId: req.user.id };
    const scripture = new Scripture(body);
    const savedScripture = await scripture.save();
    res.status(201).json(savedScripture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update scripture
export const updateScripture = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const scripture = await Scripture.findById(req.params.id);
    if (!scripture) return res.status(404).json({ error: "Scripture not found" });
    if (scripture.userId && scripture.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });
    Object.assign(scripture, req.body);
    const updated = await scripture.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete scripture
export const deleteScripture = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const scripture = await Scripture.findById(req.params.id);
    if (!scripture) return res.status(404).json({ error: "Scripture not found" });
    if (scripture.userId && scripture.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });
    await Scripture.findByIdAndDelete(req.params.id);
    res.json({ message: "Scripture deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
