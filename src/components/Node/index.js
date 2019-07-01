import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const wsServerHost = '192.168.0.113:8000';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_active: props.is_active,
        };

        this.nodeSocket = new WebSocket(
            'ws://' + wsServerHost + '/ws/device/' + props.id + '/');

        // Bind
        this.toggleState = this.toggleState.bind(this);
    }

    componentDidMount() {
        this.nodeSocket.onmessage = function(e) {
            let data = JSON.parse(e.data);
            let state = parseInt(data['state']);
            //console.log("state", state);
            this.setState( {is_active: state} );
        }.bind(this);

        this.nodeSocket.onclose = function(e) {
            console.error('Node socket closed unexpectedly');
        };
    };

    // TODO: change the statements order (i.e., first send the ws message and then check the response and update the state)
    toggleState() {
        this.setState({
            is_active: this.state.is_active ? 0 : 1  // toggle
            },  () =>  {
                this.nodeSocket.send(JSON.stringify({
                    'state': this.state.is_active
                }));
            }
        );
    };

    //<CardImg top width="100%" src={this.props.image} alt={this.props.name + " image"} />
    render() {
        return (
            <Card>
                <CardBody className="shadow-sm">
                    <CardTitle><h2>{this.props.name}</h2></CardTitle>
                    <CardSubtitle className="text-muted"><h5>{this.props.type}</h5></CardSubtitle>
                    <CardText>State: <span>{this.state.is_active ? "On" : "Off"}</span></CardText>
                    <Button onClick={this.toggleState}>Toggle</Button>
                </CardBody>
            </Card>
        );
    }
}

export default Node;
