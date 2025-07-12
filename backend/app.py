from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React

BASE_URL = "https://api.coinpaprika.com/v1"

@app.route('/api/coins')
def api_coins():
    try:
        res = requests.get(f"{BASE_URL}/tickers")
        coins = res.json()
        filtered = sorted(coins, key=lambda c: c['rank'])[:50]
        return jsonify(filtered)
    except Exception:
        # dummy fallback if API fails
        return jsonify([
            {
                "id": "btc-bitcoin",
                "name": "Bitcoin",
                "symbol": "BTC",
                "quotes": {
                    "USD": {
                        "price": 50000,
                        "percent_change_24h": 2.5
                    }
                }
            },
            {
                "id": "eth-ethereum",
                "name": "Ethereum",
                "symbol": "ETH",
                "quotes": {
                    "USD": {
                        "price": 3000,
                        "percent_change_24h": -1.2
                    }
                }
            }
        ])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
