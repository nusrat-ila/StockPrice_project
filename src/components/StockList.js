// src/components/StockList.js
import React from 'react';

const StockList = ({ symbols, onSelect }) => {
  return (
    <div className="stock-list">
      <h2>Stock Symbols</h2>
      <ul>
        {symbols.map((symbol) => (
          <li key={symbol} onClick={() => onSelect(symbol)}>
            {symbol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
