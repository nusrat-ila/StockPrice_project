import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { FINNHUB_API_KEY } from '../config';

const StockPieChart = () => {
  const [savedStocks, setSavedStocks] = useState(JSON.parse(localStorage.getItem('savedStocks')) || {});
  const [stockData, setStockData] = useState({});
  const [viewMode, setViewMode] = useState('quantity'); // 'quantity' or 'price'

  useEffect(() => {
    const fetchStockPrices = async () => {
      const data = {};
      for (const symbol of Object.keys(savedStocks)) {
        try {
          const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
            params: {
              symbol,
              token: FINNHUB_API_KEY,
            },
          });
          data[symbol] = response.data.c;
        } catch (error) {
          console.error(`Error fetching price for ${symbol}`, error);
        }
      }
      setStockData(data);
    };

    fetchStockPrices();
  }, [savedStocks]);

  const getChartData = () => {
    const labels = Object.keys(savedStocks);
    const values = labels.map((symbol) => {
      const quantity = parseInt(savedStocks[symbol], 10);
      const price = stockData[symbol] || 0;
      return viewMode === 'quantity' ? quantity : quantity * price;
    });

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  };

  return (
    <div className="stock-pie-chart">
      <h2>Stock Portfolio Pie Chart</h2>
      <div className="view-mode-selector">
        <label>
          <input
            type="radio"
            name="viewMode"
            value="quantity"
            checked={viewMode === 'quantity'}
            onChange={() => setViewMode('quantity')}
          />
          Quantity
        </label>
        <label>
          <input
            type="radio"
            name="viewMode"
            value="price"
            checked={viewMode === 'price'}
            onChange={() => setViewMode('price')}
          />
          Total Price
        </label>
      </div>
      <Pie data={getChartData()} />
    </div>
  );
};

export default StockPieChart;
