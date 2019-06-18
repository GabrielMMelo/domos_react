import React, {Component} from "react";

import {Link} from "react-router-dom";

import axios from 'axios';

class Login extends Component {

  state = {
    username: "",
    password: "",
  }

    //headers: { Authorization: "Bearer " + token }
  onSubmit = e => {
    e.preventDefault();
      let body = { username: this.state.username, password: this.state.password };
      axios
          .post("/api/v1/auth/login/", body )
          .then(res => {this.setState({ 
                data: res.data
                });
                console.log(res.data['key']);
           })
          .catch(err => console.log(err));
  }

  render() {
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

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>
    );
  }
}

export default Login;
