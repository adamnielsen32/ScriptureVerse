import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { connectDB } from "./db/connect.js";
import scriptureRoutes from "./routes/scriptures.js";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "16mb" }));

// Sessions & Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existing = await User.findOne({ googleId: profile.id });
        if (existing) return done(null, existing);
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : "";
        const user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName || "",
          email
        });
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Swagger configuration - load from generated swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/auth", authRoutes);
app.use("/api/scriptures", scriptureRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// basic root page so OAuth redirect has something to show
app.get("/", (req, res) => {
  if (req.user) {
    return res.send(`<h1>Welcome, ${req.user.displayName}</h1><p><a href='/auth/logout'>Log out</a></p>`);
  }
  res.send(`<h1>ScriptureVerse API</h1><p><a href='/auth/google'>Sign in with Google</a></p>`);
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
