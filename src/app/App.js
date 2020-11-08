import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'typeface-roboto';

import Header from '../view/Header/Header';
import Uploader from '../components/Uploader/Uploader';
import FutureWork from '../components/Future/FutureWork';

import Maps from '../components/Maps';
import Login from '../components/Landing/Login';
import SignUp from '../components/Landing/SignUp';

import './App.css';
import { useStore } from 'react-redux';

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

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  const store = useStore();

  return (
    <Router>
      <div className="App">
        <Header component={firebase} />
        <Switch>
          <Route exact path={'/futurework'} component={FutureWork} />
          <Route path={'/app'} component={Uploader} />
          <Route path={'/signup'} component={SignUp} />
          <Route
            exact
            path={'/map'}
            render={() =>
              store.getState().isLoggedIn ? <Maps /> : <Redirect to="/" />
            }
          />
          <Route path={'/'} component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default MainApp;
