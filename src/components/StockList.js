import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';

/* Get all stocks with their symbols within the given alphabetic range.
   Sorts the result in alphabetical order by symbol.
   'range' is just a Regexp to compare on, best practice format:
      /^[(start letter)-(end letter)] */
const getSymbolsInRange = (symbols, range) => {
  return symbols.filter((item) => {
    return item.symbol.match(range) ? true : false;
  }).sort((a, b) => a.symbol.localeCompare(b.symbol))
}

/* Component for a collapsable sublist of stocks.
   onSelect: function to call when the stock is clicked.
   symbols: The sublist of stock items.
   trigger: The text to display for the dropdown itself */
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
            symbols={getSymbolsInRange(symbols, /^[A-Ga-g]/)}
            trigger='A - G'
          />
        </li> 
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[H-Nh-n]/)}
            trigger='H - N'
          />
        </li> 
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[O-Uo-u]/)}
            trigger='O - U'
          />
        </li> 
        <li>
          <CollapsableStockSublist 
            onSelect={onSelect}
            symbols={getSymbolsInRange(symbols, /^[V-Zv-z]/)}
            trigger='V - Z'
          />
        </li> 
      </ul>
    </div>
  );
};

export default StockList;
