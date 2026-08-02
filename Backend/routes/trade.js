import express from "express";
import authmid from "../middlewares/authMiddleware.js";
import { buystock, sellstock} from "../controllers/trade.js";

const router = express.Router();

router.post("/trade/buy", authmid, buystock);
router.post("/trade/sell", authmid, sellstock);

export default router;