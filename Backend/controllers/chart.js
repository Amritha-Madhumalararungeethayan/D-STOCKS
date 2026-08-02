import Chartdata from "../model/charttrend.js";
import Stock from "../model/stock.js";
export const getChart = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findOne({ ticker: id });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    const data = await Chartdata.find({ stock: stock._id }).sort({ time: 1 });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching data" });
  }
};