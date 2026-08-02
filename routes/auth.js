import express from "express";
import { register, login, logout, resetpwd, forgotpwd } from "../controllers/authController.js";
import authmid from "../middlewares/authMiddleware.js";
import { getChart } from "../controllers/chart.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password/:token", resetpwd);
router.post("/forgot-password", forgotpwd);
router.get("/chart/:id",getChart);

export default router;