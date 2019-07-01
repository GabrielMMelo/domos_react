import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component { 
    render() {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link to="/" className="navbar-brand">PyIoT</Link>
        </nav>
    );
  }
}

export default Nav;
