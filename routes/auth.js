import express from "express";
import passport from "passport";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get("/google", authController.googleAuth);

router.get(
  "/google/callback",
  authController.googleCallbackAuth,
  authController.handleGoogleCallback
);

router.get("/failure", authController.failure);

router.get("/me", authController.me);

router.post("/logout", authController.logout);

export default router;
