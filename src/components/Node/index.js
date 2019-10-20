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
    }

    componentDidMount() {
        const { wsConnected } = this.state;

        this.nodeSocket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            let state = parseInt(data['state']);
            this.setState( {is_active: state} );
        };

        this.nodeSocket.onopen = () => {
            this.nodeSocket.send(JSON.stringify({
                'state': this.state.is_active,
                "token": "9255403bade0f26116679feedb87271e52d7dfff",
            }));
            this.setState({ wsConnected: true });
        }

        this.nodeSocket.onclose = (e) => {
            this.setState({ wsConnected: false });
            console.error('Node socket closed unexpectedly');
        };
    };

    toggleState = () => {
        this.setState({
            is_active: this.state.is_active ? 0 : 1  // toggle
            },  () =>  {
                this.nodeSocket.send(JSON.stringify({
                    'state': this.state.is_active,
                }));
            }
        );
    };

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
                        <Typography>{ wsConnected ? 'Conectado' : 'Desconectado'}</Typography>
                    </Box>
                </CardBody>
            </Card>
        );
    }
}

export default Node;
