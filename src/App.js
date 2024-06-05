import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContent from './MainContent';
import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('');

  return (
    <Router>
      <MainContent selectedSymbol={selectedSymbol} setSelectedSymbol={setSelectedSymbol} />
    </Router>
  );
};

export default App;
