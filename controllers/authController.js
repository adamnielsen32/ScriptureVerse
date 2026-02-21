import passport from "passport";

export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

export const googleCallbackAuth = passport.authenticate("google", { failureRedirect: "/auth/failure" });

export const handleGoogleCallback = (req, res) => {
  res.redirect(process.env.CLIENT_URL || "/");
};

export const failure = (req, res) => {
  res.status(401).json({ error: "Authentication failed" });
};

export const me = (req, res) => {
  if (!req.user) return res.status(200).json(null);
  res.json({ id: req.user.id, displayName: req.user.displayName, email: req.user.email });
};

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });
};
