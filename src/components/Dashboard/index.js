import React, { Component } from 'react';
import axios from 'axios'

import Node from 'components/Node/index.js';

class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/node/")
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
                        <div className="col-3" key={node.id}>
                            <Node image={node.image} id={node.id} name={node.name} purpouse={node.purpouse} is_active={node.is_active} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Dashboard;
