import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'containers/Home/index.js';
import Login from 'containers/Login/index.js';
import _404 from 'containers/404/index.js';

class App extends Component {


  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <Switch>
                  <Route path="/" exact={true} component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="*" exact={true} component={_404} />
              </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
