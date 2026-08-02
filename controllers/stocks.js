import express from "express" ; 
import Stock from "../model/stock.js";
import { Stock } from "./purchased_stocks.js";

const router = express.Router();

export const getStocks = async(req,res)=>{
    try{
        const stocks = await Stock.find().sort({id:1});
        res.status(200).json(stocks)
    }catch(error){
        res.status(404).json({message : "Could not find the stocks "})
    }
}

export const getStock = async(req,res)=>{
    try {
        const {id} = req.params;
        const stock = await Stock.findById(id);
        res.status(200).json(stock);
    }catch(error){
        res.status(404).json({message : "Could not find the stock "})
    }
}
export default router ; 