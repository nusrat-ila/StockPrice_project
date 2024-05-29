import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FINNHUB_API_KEY } from '../config';

const StockPrice = ({ selectedSymbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!selectedSymbol) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2`, {
          params: {
            symbol: selectedSymbol,
            token: FINNHUB_API_KEY,
          },
        });
        console.log('API Response:', response.data); // Log the API response
        setRawResponse(response.data); // Save raw response to state
        setStockData(response.data);
      } catch (err) {
        console.error('Error fetching stock data', err); // Log any errors
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
      {stockData && !error && (
        <div>
          <h2>{stockData.name} ({selectedSymbol})</h2>
          <p>Market Capitalization: ${stockData.marketCapitalization}</p>
          <p>IPO Date: {stockData.ipo}</p>
          <p>Industry: {stockData.finnhubIndustry}</p>
          <p>Web URL: <a href={stockData.weburl} target="_blank" rel="noopener noreferrer">{stockData.weburl}</a></p>
        </div>
      )}
      {rawResponse && (
        <div>
          <h3>Raw API Response:</h3>
          <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockPrice;
