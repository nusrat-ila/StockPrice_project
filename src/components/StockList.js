import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Switch from 'react-switch';
import Collapsible from 'react-collapsible';

// let sort_mode = 'name';
// let checked = false;

/* Return toggled state of the given sort mode:
   'symbol' if it was 'name'
   'name' if it was 'symbol'
   'SortModeError' if it was none of these (should be treated as an error)
*/
// const toggleSortMode = () => {
//   if (sort_mode === 'name') 
//     sort_mode = 'symbol';
//   else if (sort_mode === 'symbol')
//     sort_mode = 'name';
//   else
//     sort_mode = 'sortModeError';
// }

//Component for the sort mode switch
// const SortModeSwitch = () => {
//   return (
//     <label>
//       <span>Name</span>
//       <Switch onChange={toggleSortMode} checked={checked} />
//       <span>Symbol</span>
//     </label>
//   )
// }

const getSymbolsInRange = (symbols, range) => {
  return symbols.filter((item) => {
    return item.symbol.match(range) ? true : false;
  })
}

const CollapsableStockSublist = ({ onSelect, symbols, trigger }) => {
  return (<Collapsible trigger={trigger}>
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
  console.log(`Symbols in A - G: ${getSymbolsInRange(symbols, /^[A-Ga-g]/)}`)

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
