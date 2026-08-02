import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

export default function Createcharts() {
  const [gifData, setGif] = useState([]);
  const chartInstancesRef = useRef([]);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    async function fetchData() {

        const response = await axios.get('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
            
          }
        });
        setGif(response.data.data);

      try {
        for(const gif of response.data.data){
          const stockHistory = await axios.get(`http://localhost:5000/api/chart/${gif.id}`);
          setChartData(prev=>({
            ...prev,[gif.id]: stockHistory.data

          }))
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (gifData.length === 0) return;


    chartInstancesRef.current.forEach(chart => chart?.destroy());
    chartInstancesRef.current = [];

    gifData.forEach((item, index) => {
      const canvasId = `chart-${index}`;
      const ctx = document.getElementById(canvasId)?.getContext('2d');
      
      if (!ctx) return;
      const history = chartData[item.id] || [];

      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: history.map(point=> new Date(point.time).toLocaleTimeString()),
          datasets: [{
            label: "Meme price trends ",
            data: history.map(
              point => point.price
             ),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { 
              beginAtZero: true,
            }
          }
        }
      });

      chartInstancesRef.current.push(newChart);
    });

    return () => {
      chartInstancesRef.current.forEach(chart => chart?.destroy());
    };
  }, [gifData,chartData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      {gifData.map((item, index) => (
        <div key={item.id} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
          <h3>#{index + 1}: {item.title || 'Untitled GIF'}</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {}
            <img 
              src={item.images?.fixed_height_small?.url} 
              alt={item.title} 
              style={{ borderRadius: '4px', width: '150px', objectFit: 'cover' }}
            />
            <div style={{ position: 'relative', height: '150px', width: '100%' }}>
              <canvas id={`chart-${index}`}></canvas>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
