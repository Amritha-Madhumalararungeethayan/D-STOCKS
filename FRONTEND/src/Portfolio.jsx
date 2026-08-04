import {useEffect,useState} from "react";
import axios from "axios";
export default function Portfolio(){
const [holdings,setHoldings]=useState([]);
useEffect(()=>{
    axios.get("http://localhost:5000/api/portfolio",{withCredentials:true}).then(res=>setHoldings(res.data)).catch(err=>console.log(err))
},[]);
return(
    <div className="min-h-screen bg-slate-950 text-white p-6">
    <h1 className="text-4xl font-bold text-red-500 mb-8">
    My Portfolio
    </h1>
    <div className="grid gap-5">
    {
    holdings.map(item=>(
    <div key={item._id} className="bg-slate-800 p-5 rounded-xl"
    >
    <div className="flex gap-5 items-center">
    <img
    src={item.stock.image}
    className="w-20 h-20 rounded-lg"
    />
    <div>
    <h2 className="text-2xl font-bold">
    {item.stock.name}
    </h2>
    <p>
    Quantity: {item.quantity}
    </p>
    <p>
    Bought at: {item.buyprice}
    </p>
    <p>
    Current: {item.stock.currentPrice}
    </p>
    </div>
    </div>
    </div>
    ))

    }


    </div>


    </div>

    )

    }