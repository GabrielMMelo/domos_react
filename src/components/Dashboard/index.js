import React, { Component } from 'react';
import axios from 'axios';

import cookie from 'react-cookies';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/Styles';

import Node from 'components/Node/index.js';
import { Typography } from '@material-ui/core';

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
            .then(res => this.setState({ 
                data: res.data
            }))
            .catch(err => console.log(err));
    };

    render() {

        const { classes } = this.props;

        return (
            <Grid className={classes.container} container justify="center" spacing={3}>
                <Grid item xs={4}>
                    Gráficos
                </Grid>
                <Grid item xs={5}>
                        <Box align="left">
                            <Typography variant="h5" className={classes.subtitle}>
                                Meus dispositivos
                            </Typography>
                        </Box>
                        <Box className={classes.nodes}>
                            {this.state.data.map((node) => (
                                <div className={classes.node} key={node.id}>
                                    <Node image={node.image} id={node.id} name={node.name} type={node.type} is_active={node.state} />
                                </div>
                            ))}
                        </Box>
                </Grid>
            </Grid>
        );
    }
}

const styles = {
    container: {
        marginTop: '50px',

    },
    paper: {
        backgroundColor: '#eae9e9', 
        boxShadow: 'inset 0px 0px 7px -4px rgba(0,0,0,0.75)',
    },
    nodes: {
        padding: '20px',
        display: 'block',
        overflow: 'scroll',
        height: '400px',

    },
    node: {
        marginBottom: '30px',
    },
    subtitle: {

    }
};

export default withStyles(styles)(Dashboard);
