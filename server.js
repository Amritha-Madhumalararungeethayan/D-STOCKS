import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
const app = express(); 
const server = http.createServer(app);
connectDB() ; 
import cron from "node-cron";
import {Memes} from "./service/memes.js";
import authRoutes from "./routes/auth.js";
import feedRoutes from "./routes/feed.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
Memes();
cron.schedule("*/15 * * * *",()=>{
    console.log("update price");

    Memes();
})

cron.schedule("0 0 * * *",async()=>{
    try{
    console.log("Refresh number of coins ");
    await dailyCoins();        
        
    }
    catch(error){
        console.log(error)
    }

})


import cors from "cors";
import User from "./model/user.js";
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
    }
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname +"/public"))
app.use("/uploads",express.static("uploads"));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", authRoutes);
app.use("/api", feedRoutes);

app.get("/",(req,res)=>{
    res.send("Hiiiii");
    
});

const PORT = process.env.PORT || 5000 ; 
server.listen(PORT ,()=>{
    console.log(`server running on ${PORT}`);
});