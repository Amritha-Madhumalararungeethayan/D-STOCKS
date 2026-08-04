import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Feed() {
  const [stocks, setStocks] = useState([]);
  const [sort, setSort] = useState("trending");
  const [qty, setQty] = useState({});
  const navigate = useNavigate();
useEffect(() => {
  axios.get(`http://localhost:5000/api/feed?sort=${sort}`, { withCredentials: true })
    .then(res => setStocks(res.data))
    .catch(err => console.log(err));
}, [sort]);
  const trade = async (stockId, type) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/trade/${type}`, {
        stockId,
        quantity: Number(qty[stockId]) || 0
      }, { withCredentials: true });
      alert(res.data.message + " | balance: " + res.data.balance);
      
    } catch (err) {
      alert(err.response?.data?.message || "trade failed");
      
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 p-5 text-white">
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => navigate("/charts")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-full"
          >
          Charts
          </button>
        <button
          onClick={() => navigate("/portfolio")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-full"
          >
          Current Holdings 
          </button>          

        <button 
          onClick={() => setSort("trending")}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full"
        >
          Trending
        </button>
        <button 
          onClick={() => setSort("new")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-full"
        >
          New
        </button>
        <button 
          onClick={() => setSort("rising")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-full"
        >
          Rising
        </button>
      </div>
      {stocks.map(stock => (
        <div 
          key={stock._id} 
          className="bg-slate-800 border border-slate-600 rounded-xl p-5 mb-4 shadow-lg"
        >
          <img 
            src={stock.image} 
            width="100" 
            className="rounded-lg mb-3"
          />
          <h3 className="text-2xl font-bold">
            {stock.name}
          </h3>
          <p className="text-red-400 text-lg">
            {stock.currentPrice} coins
          </p>
          <input
            type="number"
            placeholder="qty"
            onChange={e => setQty({ ...qty, [stock._id]: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 mt-3 text-white outline-none"
          />
          <div className="flex gap-3 mt-3">
            <button 
              onClick={() => trade(stock._id, "buy")}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
            >
              Buy
            </button>
            <button 
              onClick={() => trade(stock._id, "sell")}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
            >
              Sell
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}