import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 shadow bg-white dark:bg-gray-900 dark:text-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <img
          src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026"
          alt="logo"
          className="w-6 h-6 animate-blink"
        />
        CryptoDashboard
      </Link>

      <input
        type="text"
        placeholder="Search coin..."
        onChange={(e) => onSearch(e.target.value)}
        className="px-3 py-1 rounded border dark:bg-gray-800 dark:border-gray-700"
      />

      <button
        onClick={toggleDark}
        className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
