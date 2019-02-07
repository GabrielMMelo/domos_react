import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class Node extends Component { 
  render() {
    return (
        <Card>
            <CardBody className="shadow-sm">
                <CardImg top width="100%" src={this.props.image} alt={this.props.name + " image"} />
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
