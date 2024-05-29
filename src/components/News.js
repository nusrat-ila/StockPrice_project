// src/components/News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FINNHUB_API_KEY } from '../config';
import StockList from './StockList';

const News = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!selectedSymbol) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://finnhub.io/api/v1/company-news`, {
          params: {
            symbol: selectedSymbol,
            from: '2023-01-01',
            to: new Date().toISOString().split('T')[0],
            token: FINNHUB_API_KEY,
          },
        });
        setNews(response.data);
      } catch (err) {
        console.error('Error fetching news', err);
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedSymbol]);

  return (
    <div className="news-page">
      <div className="left-pane">
        <StockList onSelect={setSelectedSymbol} />
      </div>
      <div className="news-container">
        <h2>Latest News for {selectedSymbol}</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <h3>{article.headline}</h3>
              <p>{article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
