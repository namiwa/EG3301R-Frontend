import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "typeface-roboto";

import Header from "../view/Header/Header";
import Uploader from "../components/Uploader/Uploader";
import FutureWork from "../components/Future/FutureWork";
import Maps from "../components/Maps";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path={"/futurework"} component={FutureWork} />
          <Route exact path={"/"} component={Uploader} />
          <Route exact path={"/map"} component={Maps} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
