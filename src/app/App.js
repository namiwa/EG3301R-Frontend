import React from 'react';
import "typeface-roboto";

import Header from '../view/Header/Header';
import Uploader from '../components/Uploader/Uploader';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Uploader />
    </div>
  );
}

export default App;
