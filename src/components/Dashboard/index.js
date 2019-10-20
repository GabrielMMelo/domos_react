import React, { Component } from 'react';
import axios from 'axios';

import cookie from 'react-cookies';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/Styles';

import Node from 'components/Node/index.js';
import ChartMostUsed from 'components/ChartMostUsed';

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
                    <Box align="left">
                        <Typography variant="h5" className={classes.subtitle}>
                            Estatísticas de uso
                        </Typography>
                    </Box>
                    <Box className={classes.charts}>
                        <ChartMostUsed />
                    </Box>
                    <Box className={classes.charts}>
                        <ChartMostUsed />
                    </Box>
                </Grid>
                <Grid item xs={5}>
                        <Box align="left">
                            <Typography variant="h5" className={classes.subtitle}>
                                Principais dispositivos
                            </Typography>
                        </Box>
                        <Box className={classes.nodes}>
                            {this.state.data.map((node, idx) => {
                                if (idx < 2)
                                    return (
                                        <div className={classes.node} key={idx}>
                                            <Node image={node.image} id={node.id} name={node.name} type={node.type} is_active={node.state} />
                                        </div>
                                    )
                            })}
                            <Box align="center">
                                <Button className={classes.btn} variant="outlined">
                                    VER TODOS
                                </Button>
                            </Box>
                        </Box>
                </Grid>
            </Grid>
        );
    }
}

const styles = {
    container: {
        marginTop: '30px',

    },
    paper: {
        backgroundColor: '#eae9e9', 
        boxShadow: 'inset 0px 0px 7px -4px rgba(0,0,0,0.75)',
    },
    charts: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    btn: {
        color: '#f4f4f4',
        backgroundColor: 'cadetblue',
        border: 'none',
        '&:hover': {
            backgroundColor: '#508486',
        }

    },
    nodes: {
        padding: '20px',
    },
    node: {
        marginBottom: '30px',
    },
    subtitle: {
        fontVariant: 'all-small-caps',
        fontWeight: 'bold',
        color: '#363636',
    }
};

export default withStyles(styles)(Dashboard);
