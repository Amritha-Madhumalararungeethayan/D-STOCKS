import express from "express";
import Transaction from "../model/transaction.js";
const router = express.Router() ; 

export const getTransaction = async(req,res)=>{
    try {
const transactions = await Transaction.find({userId : req.user.id}).sort({transactedAt:-1});
res.status(200).json(transactions);

    }catch(errror){
        res.status(404).json({message : "Cannot fetch transactions"})

    }
    
}

export default router ; 