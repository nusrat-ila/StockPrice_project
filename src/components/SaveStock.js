
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaveStock = () => {
  const [symbols, setSymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [savedStocks, setSavedStocks] = useState(JSON.parse(localStorage.getItem('savedStocks')) || {});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStockSymbols = async () => {
      try {
        const response = await axios.get('/stockSymbols.json');
        setSymbols(response.data);
      } catch (err) {
        console.error('Error fetching stock symbols', err);
      }
    };

    fetchStockSymbols();
  }, []);

  const handleSave = () => {
    if (selectedSymbol && quantity) {
      const updatedStocks = { ...savedStocks, [selectedSymbol]: quantity };
      setSavedStocks(updatedStocks);
      localStorage.setItem('savedStocks', JSON.stringify(updatedStocks));
      setMessage(`Saved ${quantity} shares of ${selectedSymbol}`);
    }
  };

  return (
    <div className="save-stock">
      <h2>Save Stock Information</h2>
      <div className="form-group">
        <label>Select Stock: </label>
        <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
          <option value="">Select a stock</option>
          {symbols.map((symbol, index) => (
            <option key={index} value={symbol.symbol}>
              {symbol.symbol} - {symbol.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      {message && <p className="message">{message}</p>}
      <h3>Previously Saved Stocks</h3>
      <ul>
        {Object.keys(savedStocks).map((symbol) => (
          <li key={symbol}>
            {symbol}: {savedStocks[symbol]} shares
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaveStock;
