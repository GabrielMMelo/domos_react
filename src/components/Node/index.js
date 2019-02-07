import React, { Component } from 'react';

import axios from 'axios'

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class Node extends Component { 
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
        .get("http://localhost:8000/node/" + this.props.id)
            .then(res => this.setState({ name: res.data.name,
                purpouse: res.data.purpouse,
                is_active: res.data.is_active
            }))
        .catch(err => console.log(err));
    };

  render() {
    return (
        <Card>
            <CardBody className="shadow-sm">
                <CardTitle><h2>{this.props.name}</h2></CardTitle>
                <CardSubtitle className="text-muted"><h5>{this.props.purpouse}</h5></CardSubtitle>
                <CardText>State: <span>{this.props.is_active ? "On" : "Off"}</span></CardText>
                <Button>Toggle</Button>
            </CardBody>
        </Card>
    );
  }
}

export default Node;
