import React from "react";
import { Routes, Route } from "react-router-dom";
import CoinList from "./components/CoinList";
import CoinDetail from "./components/CoinDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoinList />} />
      <Route path="/coin/:id" element={<CoinDetail />} />
    </Routes>
  );
}

export default App;
