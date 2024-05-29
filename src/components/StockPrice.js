// src/components/StockPrice.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../config';

const StockPrice = ({ selectedSymbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!selectedSymbol) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: selectedSymbol,
            apikey: API_KEY
          }
        });
        const data = response.data['Global Quote'];
        setStockData(data);
      } catch (err) {
        setError('Error fetching stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [selectedSymbol]);

  return (
    <div className="stock-details">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {stockData && (
        <div>
          <h2>{selectedSymbol}</h2>
          <p>Price: ${stockData['05. price']}</p>
          <p>Change: {stockData['09. change']}</p>
          <p>Change Percent: {stockData['10. change percent']}</p>
        </div>
      )}
    </div>
  );
};

export default StockPrice;
