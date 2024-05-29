import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockList = ({ onSelect }) => {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockSymbols = async () => {
      try {
        const response = await axios.get('/stockSymbols.json');
        setSymbols(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching stock symbols');
        setLoading(false);
      }
    };

    fetchStockSymbols();
  }, []);

  return (
    <div className="stock-list">
      <h2>Stock Symbols</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {symbols.map((item, index) => (
          <li key={index} onClick={() => onSelect(item.symbol)}>
            {item.symbol} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
