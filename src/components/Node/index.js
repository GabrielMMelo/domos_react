import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const wsServerHost = 'gabrielmelo.ddns.net:8081';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_active: props.is_active,
            wsConnected: false,
        };

        this.nodeSocket = new WebSocket(
            'ws://' + wsServerHost + '/ws/device/' + props.id + '/'
        );

        //TODO: fire a message through ws connection to authorize

        this.setState({ wsConnected: true });

        // Bind
        this.toggleState = this.toggleState.bind(this);
    }

    componentDidMount() {
        const { wsConnected } = this.state;

        this.nodeSocket.onmessage = function(e) {
            let data = JSON.parse(e.data);
            let state = parseInt(data['state']);
            //console.log("state", state);
            this.setState( {is_active: state} );
        }.bind(this);

        this.nodeSocket.onclose = function(e) {
            this.setState({ wsConnected: false });
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

        const { wsConnected } = this.state;

        return (
            <Card>
                <CardBody className="shadow-sm">
                    <CardTitle><h2>{this.props.name}</h2></CardTitle>
                    <CardSubtitle className="text-muted"><h5>{this.props.type}</h5></CardSubtitle>
                    <CardText>State: <span>{this.state.is_active ? "On" : "Off"}</span></CardText>
                    <Button onClick={this.toggleState}>Toggle</Button>
                    <Box align="right">
                        <Typography onClick={this.toggleState}>Toggle</Typography>
                    </Box>
                </CardBody>
            </Card>
        );
    }
}

export default Node;
