import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/coins")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background animation layer */}
      <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-white via-blue-100 to-sky-300 animate-pulse opacity-80 -z-10" />

      {/* Optional shimmer radial glow */}
      <div className="absolute -top-1/3 -left-1/3 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_white,transparent)] opacity-20 animate-pulse-fast blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 drop-shadow">Top 50 Cryptocurrencies</h1>
        <div className="overflow-x-auto bg-white/80 backdrop-blur rounded-2xl shadow-2xl ring-1 ring-blue-100">
          <table className="min-w-full table-auto border-collapse text-gray-800">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Rank</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-left">Price (USD)</th>
                <th className="px-4 py-3 text-left">24h %</th>
                <th className="px-4 py-3 text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr key={coin.id} className="hover:bg-blue-50 transition duration-200 ease-in-out">
                  <td className="px-4 py-2">{coin.rank}</td>
                  <td className="px-4 py-2">{coin.name}</td>
                  <td className="px-4 py-2">{coin.symbol}</td>
                  <td className="px-4 py-2">${coin.quotes?.USD?.price?.toFixed(2)}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      coin.quotes?.USD?.percent_change_24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {coin.quotes?.USD?.percent_change_24h?.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2 text-blue-600 underline">
                    <Link to={`/coin/${coin.id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CoinList;
