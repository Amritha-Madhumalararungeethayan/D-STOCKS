import User from "../model/user.js";
import Stock from "../model/stock.js";
import Holding from "../model/holding.js";
import Trade from "../model/trade.js";

export const buystock = async(req,res)=>{
    try{
        const userId = req.userId; 
        const {stockId , quantity} = req.body ; 
        if(!quantity || quantity <=0 ){
            return res.status(400).json({ message: "Invalid quantity" });
        }
        const stock = await Stock.findById(stockId);
        if(!stock){
            return res.status(404).json({message:"Stock not found "})
        }
        const cost = stock.currentPrice * quantity;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.coins < cost) {
            return res.status(400).json({ message: "Insufficient coins" });
        }
        user.coins -= cost;
        await user.save();
        let holding = await Holding.findOne({ user: userId, stock: stockId });
        if (holding) {
            const totalCost = holding.buyprice * holding.quantity + cost;
            const totalQuantity = holding.quantity + quantity;
            holding.buyprice = totalCost / totalQuantity;
            holding.quantity = totalQuantity;
            await holding.save();
        }else{
            holding = await Holding.create({
                user : userId , 
                stock : stockId , 
                quantity,
                buyprice : stock.currentPrice,
                
            });
        }
        await Trade.create({
            user: userId,
            stock: stockId,
            type: "buy",
            quantity,
            price: stock.currentPrice,           
        });
        res.status(200).json({message : "Buy successful", holding , balance :user.coins});

        

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error processing buy order" });
    }

};


export const sellstock = async(req,res)=>{
    try {
        const userId = req.userId ; 
        const {stockId , quantity} = req.body; 
        if(!quantity || quantity <=0 ){
            return res.status(400).json({ message: "Invalid quantity" });
        }
        const stock = await Stock.findById(stockId);
        if(!stock){
            return res.status(404).json({message:"Stock not found "})
        }  
        const holding= await Holding.findOne({user : userId , stock : stockId});  
        if (!holding || holding.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient shares " });
        }
        const money = stock.currentPrice * quantity;
        const user = await User.findById(userId);
        user.coins += money;
        await user.save();
        holding.quantity -= quantity;
        if (holding.quantity === 0) {
            await Holding.deleteOne({ _id: holding._id });
        } else {
            await holding.save();
        }
        await Trade.create({
            user: userId,
            stock: stockId,
            type: "sell",
            quantity,
            price: stock.currentPrice,
        });
        res.status(200).json({ message: "Sold stocks ", balance: user.coins });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error " });
    }
};
    