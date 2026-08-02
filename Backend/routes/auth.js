import express from "express";
import { register, login, logout, resetpwd, forgotpwd } from "../controllers/authController.js";
import authmid from "../middlewares/authMiddleware.js";
import { getChart } from "../controllers/chart.js";
import  passport from "passport";
import "../config/passport-google.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password/:token", resetpwd);
router.post("/forgot-password", forgotpwd);
router.get("/chart/:id",getChart);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/feed");
  }
);

export default router;