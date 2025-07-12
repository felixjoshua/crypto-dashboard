import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/coins`)
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((c) => c.id === id);
        setCoin(selected);
      });

    fetch(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/latest/`)
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => setHistory([]));
  }, [id]);

  if (!coin) return <div className="p-6">Loading...</div>;

  const priceUSD = coin.quotes.USD.price;
  const priceIDR = priceUSD * 16000;

  const chartData = {
    labels: history.map((d) => d.time_open?.slice(0, 10)),
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: history.map((d) => d.close),
        borderColor: "#4f46e5",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{coin.name} ({coin.symbol})</h2>
      <p className="text-lg">Price: ${priceUSD.toFixed(2)}</p>
      <p className="text-lg mb-4">≈ Rp {priceIDR.toLocaleString("id-ID")}</p>

      {history.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>Chart data unavailable.</p>
      )}
    </div>
  );
};

export default CoinDetail;
