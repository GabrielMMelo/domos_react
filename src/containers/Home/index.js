import React, { Component } from 'react';

import Header from 'components/Header/index.js';
import Dashboard from 'components/Dashboard/index.js';

class Home extends Component { 
  render() {
    return (
        <div>
            <Header />
            <Dashboard />
        </div>
    );
  }
}

export default Home;
