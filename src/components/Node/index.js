import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class Node extends Component { 
    constructor(props){
        super(props);
        this.state = {
            is_active: props.is_active,
        };


        this.nodeSocket = new WebSocket(
            'ws://192.168.0.110:8000/ws/node/node_' +
            props.id + '/');

        // Bind
        this.toggleState = this.toggleState.bind(this);
    }

    componentDidMount() {
        this.nodeSocket.onmessage = function(e) {
            let data = JSON.parse(e.data);
            let message = data['message'];
            this.setState( {is_active: message} );
        }.bind(this);
        
        this.nodeSocket.onclose = function(e) {
            console.error('Node socket closed unexpectedly');
        };
    };

    toggleState() {
        this.setState({
            is_active: !this.state.is_active
            },  () =>  { 
                this.nodeSocket.send(JSON.stringify({
                    'message': this.state.is_active
                }));
            }
        );
    };

    render() {
        return (
            <Card>
                <CardBody className="shadow-sm">
                    <CardImg top width="100%" src={this.props.image} alt={this.props.name + " image"} />
                    <CardTitle><h2>{this.props.name}</h2></CardTitle>
                    <CardSubtitle className="text-muted"><h5>{this.props.purpouse}</h5></CardSubtitle>
                    <CardText>State: <span>{this.state.is_active ? "On" : "Off"}</span></CardText>
                    <Button onClick={this.toggleState}>Toggle</Button>
                </CardBody>
            </Card>
        );
    }
}

export default Node;
