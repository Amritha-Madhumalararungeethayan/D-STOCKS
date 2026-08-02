import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [stocks, setStocks] = useState([]);
  const [sort, setSort] = useState("trending");
  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await axios.get(`http://localhost:5000/api/feed?sort=${sort}`);
        setStocks(res.data);
      } catch (error) {
        console.error("could not fetch feed", error);
      }
    }
    fetchFeed();
  }, [sort]);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["trending", "new", "rising"].map(option => (
          <button
            key={option}
            onClick={() => setSort(option)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: sort === option ? "#4bc0c0" : "transparent",
              color: sort === option ? "#000" : "#fff",
              cursor: "pointer",
            }}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {stocks.map(stock => (
          <div
            key={stock._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <img
              src={stock.image}
              alt={stock.name}
              style={{ width: "100px", borderRadius: "4px" }}
            />
            <div>
              <h3>{stock.name}</h3>
              <p>Ticker: {stock.ticker}</p>
              <p>Price: {stock.currentPrice}</p>
              {stock.change !== undefined && (
                <p>Change: {(stock.change * 100).toFixed(1)}%</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}