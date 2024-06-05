import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import StockList from './components/StockList';
import StockPrice from './components/StockPrice';
import News from './components/News';
import SaveStock from './components/SaveStock';
import StockPieChart from './components/StockPieChart';
import './App.css';

const MainContent = ({ selectedSymbol, setSelectedSymbol }) => {
  const [selectedPath, setSelectedPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  const getBackgroundClass = (path) => {
    switch (path) {
      case '/news':
        return 'news-bg';
      case '/save-stock':
        return 'save-stock-bg';
      case '/pie-chart':
        return 'pie-chart-bg';
      default:
        return 'home-bg';
    }
  };

  return (
    <div className={`App ${getBackgroundClass(selectedPath)}`}>
      <div className="top-bar">
        <h1>Stock Price Checker</h1>
        <nav>
          <NavLink exact to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? 'active-link' : ''}>News</NavLink>
          <NavLink to="/save-stock" className={({ isActive }) => isActive ? 'active-link' : ''}>Save Stock</NavLink>
          <NavLink to="/pie-chart" className={({ isActive }) => isActive ? 'active-link' : ''}>Pie Chart</NavLink>
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
                <StockPrice selectedSymbol={selectedSymbol} />
              </div>
            </>
          } />
          <Route path="/news" element={<News />} />
          <Route path="/save-stock" element={<SaveStock />} />
          <Route path="/pie-chart" element={<StockPieChart />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
