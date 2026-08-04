import express from "express";
import Stock from "../model/stock.js";
const router = express.Router();
import authmid from "../middlewares/authMiddleware.js"

router.get("/feed", authmid , async (req, res) => {
  try {
    const { sort = "trending" } = req.query;
    let stocks;
    if (sort === "new") {
      stocks = await Stock.find().sort({ createdAt: -1 });
    } else if (sort === "rising") {
      stocks = await Stock.find();
      stocks = stocks
        .map(s => ({...s.toObject(),change: s.initialPrice?(s.currentPrice - s.initialPrice) / s.initialPrice:0,
        }))
        .sort((a, b) => b.change - a.change);
    } else {
      stocks = await Stock.find().sort({ currentPrice: -1 });
    }

    res.status(200).json(stocks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching feed" });
  }
});

export default router;