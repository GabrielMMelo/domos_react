import React, {Component} from "react";

import {Link} from "react-router-dom";

import cookie from 'react-cookies';

import axios from 'axios';

import Home from 'containers/Home/index.js';

class Login extends Component {

  state = {
    username: "",
    password: "",
  }

    onSubmit = e => {
        e.preventDefault();
        let body = { username: this.state.username, password: this.state.password };
        axios
            .post("/api/v1/auth/login/", body)
            .then(res => {
                this.setState({ 
                    data: res.data
                });
                const expires = new Date();
                expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
                console.log(res.data['key']);
                cookie.save('token', res.data['key'], { path: '/', expires });
                console.log({ token: cookie.load('token') });
           })
          .catch(err => console.log(err));
  }

  render() {
      console.log({ token: cookie.load('token') });
      if (!cookie.load('token')){
            return (
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                    <legend>Login</legend>
                    <p>
                        <label htmlFor="username">Username</label>
                        <input
                        type="text" id="username"
                        onChange={e => this.setState({username: e.target.value})} />
                    </p>
                    <p>
                        <label htmlFor="password">Password</label>
                        <input
                        type="password" id="password"
                        onChange={e => this.setState({password: e.target.value})} />
                    </p>
                    <p>
                        <button type="submit">Login</button>
                    </p>

                    </fieldset>
                </form>
            );
        }
      else {
          return (
              <Home/>
          );
      }
  }
}

export default Login;
