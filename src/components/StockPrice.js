import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FINNHUB_API_KEY } from '../config';

const StockPrice = ({ selectedSymbol }) => {
  const [companyData, setCompanyData] = useState(null);
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [showRawResponse, setShowRawResponse] = useState(false); // State for toggling visibility

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSymbol) return;

      setLoading(true);
      setError(null);

      try {
        const companyResponse = await axios.get(`https://finnhub.io/api/v1/stock/profile2`, {
          params: {
            symbol: selectedSymbol,
            token: FINNHUB_API_KEY,
          },
        });

        const quoteResponse = await axios.get(`https://finnhub.io/api/v1/quote`, {
          params: {
            symbol: selectedSymbol,
            token: FINNHUB_API_KEY,
          },
        });

        console.log('Company API Response:', companyResponse.data);
        console.log('Quote API Response:', quoteResponse.data);

        setRawResponse({ companyData: companyResponse.data, quoteData: quoteResponse.data });
        setCompanyData(companyResponse.data);
        setQuoteData(quoteResponse.data);
      } catch (err) {
        console.error('Error fetching stock data', err);
        setError('Error fetching stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSymbol]);

  return (
    <div className="stock-details">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {companyData && quoteData && !error && (
        <div>
		  <img class="logo" src={companyData.logo} alt="icon"/>
          <h2>{companyData.name} ({selectedSymbol})</h2>
          <p>Market Capitalization: ${companyData.marketCapitalization}</p>
          <p>Current Price: ${quoteData.c}</p>
		  <p>Percentage change: {quoteData.dp}</p>
          <p>High Price of the day: ${quoteData.h}</p>
          <p>Low Price of the day: ${quoteData.l}</p>
		  <p>Open Price of the day: ${quoteData.o}</p>
		  <p>Close price last day: ${quoteData.pc}</p>
          <p>IPO Date: {companyData.ipo}</p>
          <p>Industry: {companyData.finnhubIndustry}</p>
          <p>Web URL: <a href={companyData.weburl} target="_blank" rel="noopener noreferrer">{companyData.weburl}</a></p>
        </div>
      )}
      <button onClick={() => setShowRawResponse(!showRawResponse)}>
        {showRawResponse ? 'Hide' : 'Show'} Raw API Response
      </button>
      {showRawResponse && rawResponse && (
        <div className="raw-api-response">
          <h3>Raw API Response:</h3>
          <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockPrice;
