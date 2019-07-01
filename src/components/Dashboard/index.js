import React, { Component } from 'react';
import axios from 'axios';

import cookie from 'react-cookies';

import Node from 'components/Node/index.js';

class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.state = {
            data: [],
            token: '',
        };
    }

    componentDidMount() {
        this.setState({ token: cookie.load('token') }, this.refreshList());
    }

    refreshList = () => {
        console.log({ token: this.state.token});
        axios
            .get("/api/v1/device/", { headers: { Authorization: `Token ${cookie.load('token')}` } })
            //.get("/api/v1/device/")
            .then(res => this.setState({ 
                data: res.data
            }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="row justify-content-center mt-4">
                {this.state.data.map( (node) => {
                    return (
                        <div className="col-10" key={node.id}>
                            <Node image={node.image} id={node.id} name={node.name} type={node.type} is_active={node.state} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Dashboard;
