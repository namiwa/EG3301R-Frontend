<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "typeface-roboto";
=======
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import 'typeface-roboto';
>>>>>>> eca5af6930f512c1a03302849d8885c43f71f3f2

import Header from '../view/Header/Header';
import Uploader from '../components/Uploader/Uploader';
import FutureWork from '../components/Future/FutureWork';

import Maps from '../components/Maps';
import Login from '../components/Landing/Login';
import SignUp from '../components/Landing/SignUp';

<<<<<<< HEAD
import "./App.css";
import { useStore } from "react-redux";
=======
import './App.css';
>>>>>>> eca5af6930f512c1a03302849d8885c43f71f3f2

function MainApp() {
  // Firebase App (the core Firebase SDK) is always required and
  // must be listed before other Firebase SDKs
  var firebase = require('firebase/app');

  // Add the Firebase products that you want to use
  require('firebase/auth');

  var config = {
    apiKey: 'AIzaSyA19IXEtl_FCH7syIR8GGDd53v39rfubeY',
    authDomain: 'eg3301r-ml-satellie.firebaseapp.com',
    databaseURL: 'https://eg3301r-ml-satellie.firebaseio.com',
    projectId: 'eg3301r-ml-satellie',
    storageBucket: 'eg3301r-ml-satellie.appspot.com',
    messagingSenderId: '964614113793',
    appId: '1:964614113793:web:5fec0fa917766c6e46ce00',
    measurementId: 'G-DK8V13KB05',
  };

  firebase.initializeApp(config);

  const store = useStore()
  const isLoggedIn = store.getState().isLoggedIn

  return (
    <Router>
      <div className="App">
        <Header component={firebase} />
        <Switch>
<<<<<<< HEAD
          <Route exact path={"/futurework"} component={FutureWork} />
          <Route path={"/app"} component={Uploader} />
          <Route path={"/signup"} component={SignUp} />
          <Route exact path={"/map"} render = {() => (store.getState().isLoggedIn ?  (<Maps/>) : (<Redirect to="/" />))} />
         <Route path={"/"} component={Login} />
=======
          <Route exact path={'/futurework'} component={FutureWork} />
          <Route path={'/app'} component={Uploader} />
          <Route path={'/signup'} component={SignUp} />
          <Route exact path={'/map'} component={Maps} />
          <Route path={'/'} component={Login} />
>>>>>>> eca5af6930f512c1a03302849d8885c43f71f3f2
        </Switch>
      </div>
    </Router>
  );
}

export default MainApp;
