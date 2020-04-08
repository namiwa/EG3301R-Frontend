import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "typeface-roboto";

import Header from '../view/Header/Header';
import Uploader from '../components/Uploader/Uploader';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path={'/'} component={Uploader} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
