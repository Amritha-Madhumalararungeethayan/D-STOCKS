import axios from "axios"; 
import Stock from "../model/stock.js";
import Chartdata from "../model/charttrend.js";

export async function Memes(){
    try{
    const res = await axios.get("https://api.giphy.com/v1/gifs/trending",{
            params: {
                api_key: process.env.GIPHY_API_KEY,
                
            }        
    });
    const gifs = res.data.data;
    for(let rank = 0 ; rank <gifs.length ; rank++ ){
        const g = gifs[rank];
         const price = 100 + (gifs.length - rank ) * 10;
        const stock = await Stock.findOneAndUpdate(
            {ticker : g.id},
            {
                ticker: g.id,
                name : g.title || "Untitled", 
                image :g.images.fixed_height.url,
                currentPrice : price 
            },
            {upsert:true,
            returnDocument: 'after'
            }

        );
        await Chartdata.create({
            stock : stock._id , 
            price:price ,
            time : new Date()
        })
    }
    }
    catch(err){
        console.log(err.message);

    }
}

