import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [stocks, setStocks] = useState([]);
  const [sort, setSort] = useState("trending");
  const [qty, setQty] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/feed?sort=${sort}`).then(res => setStocks(res.data)).catch(err => console.log(err));
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
    <div style={{ padding: 20 }}>
      <button onClick={() => setSort("trending")}>Trending</button>
      <button onClick={() => setSort("new")}>New</button>
      <button onClick={() => setSort("rising")}>Rising</button>
      {stocks.map(stock => (
        <div key={stock._id} style={{ border: "1px solid gray", margin: "10px 0", padding: 10 }}>
          <img src={stock.image} width="100" />
          <h3>{stock.name}</h3>
          <p>{stock.currentPrice} coins</p>
          <input
            type="number"
            placeholder="qty"
            onChange={e => setQty({ ...qty, [stock._id]: e.target.value })}
          />
          <button onClick={() => trade(stock._id, "buy")}>Buy</button>
          <button onClick={() => trade(stock._id, "sell")}>Sell</button>
        </div>
      ))}
    </div>
  );
}