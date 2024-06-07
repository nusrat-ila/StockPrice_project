import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';


const getSymbolsInRange = (symbols, range) => {
  return symbols.filter((item) => {
    return item.symbol.match(range) ? true : false;
  }).sort((a, b) => a.symbol.localeCompare(b.symbol))
}

const CollapsableStockSublist = ({ onSelect, symbols, trigger }) => {
  return (<Collapsible trigger={trigger} 
    className='collapsible'
    openedClassName='collapsible collapsible-open'
    triggerClassName='collapsible-trigger'
    triggerOpenedClassName='collapsible-trigger'>
      <ul>
        {symbols.map((item, index) => (
          <li key={index} onClick={() => onSelect(item.symbol)}>
            {item.symbol} - {item.name}
          </li>
        ))}
      </ul>
  </Collapsible>);

}

const StockList = ({ onSelect }) => {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockSymbols = async () => {
      try {
        const response = await axios.get('/stockSymbols.json');
        setSymbols(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching stock symbols');
        setLoading(false);
      }
    };

    fetchStockSymbols();
  }, []);

  return (
    <div className="stock-list">
      <h2>Stock Symbols</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[A-Fa-f]/)}
            trigger='A - F'
          />
        </li> 
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[G-Lg-l]/)}
            trigger='G - L'
          />
        </li> 
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[M-Sm-s]/)}
            trigger='M - S'
          />
        </li> 
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[T-Zt-z]/)}
            trigger='T - Z'
          />
        </li> 
      </ul>
    </div>
  );
};

export default StockList;
