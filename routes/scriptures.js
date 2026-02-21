import express from "express";
import {
  getAllScriptures,
  getScriptureById,
  createScripture,
  updateScripture,
  deleteScripture
} from "../controllers/scriptureController.js";

const router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "Unauthorized" });
};

/**
 * #swagger.tags = ['Scriptures']
 * #swagger.summary = 'Get all scriptures'
 * #swagger.responses[200] = { description: 'List of all scriptures' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
router.get("/", getAllScriptures);

/**
 * #swagger.tags = ['Scriptures']
 * #swagger.summary = 'Get a scripture by ID'
 * #swagger.parameters['id'] = { description: 'Scripture ID', required: true }
 * #swagger.responses[200] = { description: 'Scripture found' }
 * #swagger.responses[404] = { description: 'Scripture not found' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
router.get("/:id", getScriptureById);

/**
 * #swagger.tags = ['Scriptures']
 * #swagger.summary = 'Create a new scripture'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   required: true,
 *   schema: { $ref: '#/definitions/Scripture' }
 * }
 * #swagger.responses[201] = { description: 'Scripture created' }
 * #swagger.responses[400] = { description: 'Invalid input' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
router.post("/", requireAuth, createScripture);

/**
 * #swagger.tags = ['Scriptures']
 * #swagger.summary = 'Update a scripture'
 * #swagger.parameters['id'] = { description: 'Scripture ID', required: true }
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   required: true,
 *   schema: { $ref: '#/definitions/Scripture' }
 * }
 * #swagger.responses[200] = { description: 'Scripture updated' }
 * #swagger.responses[404] = { description: 'Scripture not found' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
router.put("/:id", requireAuth, updateScripture);

/**
 * #swagger.tags = ['Scriptures']
 * #swagger.summary = 'Delete a scripture'
 * #swagger.parameters['id'] = { description: 'Scripture ID', required: true }
 * #swagger.responses[200] = { description: 'Scripture deleted' }
 * #swagger.responses[404] = { description: 'Scripture not found' }
 * #swagger.responses[500] = { description: 'Server error' }
 */
router.delete("/:id", requireAuth, deleteScripture);

export default router;
