// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StockList from './components/StockList';
import StockPrice from './components/StockPrice';
import News from './components/News';
import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('');

  return (
    <Router>
      <div className="App">
        <div className="top-bar">
          <h1>Stock Price Checker</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/news">News</Link>
          </nav>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={
              <>
                <div className="left-pane">
                  <StockList onSelect={setSelectedSymbol} />
                </div>
                <div className="main-pane">
                  <StockPrice selectedSymbol={setSelectedSymbol} />
                </div>
              </>
            } />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
