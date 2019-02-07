import React, { Component } from 'react';
import axios from 'axios'

import Node from 'components/Node/index.js';

class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.state = {
            name: '',
            purpouse: '',
            is_active: ''
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/node/1/")
            .then(res => this.setState({ name: res.data.name,
                purpouse: res.data.purpouse,
                is_active: res.data.is_active
            }))
        .catch(err => console.log(err));
    };

  render() {
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-3">
            <Node name={this.state.name} purpouse={this.state.purpouse} is_active={this.state.is_active} />
            </div>
            <div className="col-3">
            <Node name={this.state.name} purpouse={this.state.purpouse} is_active={this.state.is_active} />
            </div>
        </div>
    );
  }
}

export default Dashboard;
