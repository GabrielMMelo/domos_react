import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Node from 'components/Node/index.js';
import ChartMostUsed from 'components/ChartMostUsed';
import api from '../../services/api';
import { getToken } from '../../auth/authenticator';

class Dashboard extends Component { 
    constructor(props){
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.getDevices();
    }

    getDevices = () => {
        api.get("device/", { headers: { Authorization: `Token ${getToken()}` } })
            .then(res => {
                this.setState({ 
                    data: res.data
                });
            })
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
                                if (idx < 2) {
                                    return (
                                        <div className={classes.node} key={idx}>
                                            <Node image={node.image} id={node.id} name={node.name} type={node.type} is_active={node.state} />
                                        </div>
                                    )
                                }
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
