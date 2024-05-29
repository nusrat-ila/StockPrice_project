// src/App.js
import React, { useState } from 'react';
import StockList from './components/StockList';
import StockPrice from './components/StockPrice';
import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']; // Example stock symbols

  return (
    <div className="App">
      <div className="top-bar">
        <h1>Stock Price Checker</h1>
      </div>
      <div className="content">
        <div className="left-pane">
          <StockList symbols={stockSymbols} onSelect={setSelectedSymbol} />
        </div>
        <div className="main-pane">
          <StockPrice selectedSymbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
};

export default App;
