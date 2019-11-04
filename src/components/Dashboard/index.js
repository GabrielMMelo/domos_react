import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box display='flex' align="left" marginRight={2.5}>
                                <Typography variant="h5" className={classes.subtitle}>
                                    Estatísticas de uso
                                </Typography>
                                <Box flexGrow={1}/>
                                <Button className={classes.btn} variant="outlined">
                                    VER TODAS
                                    <ArrowForwardIosIcon className={classes.arrowForwardIcon} />
                                </Button>
                            </Box>
                            <Box display='flex'>
                                <Box className={classes.charts}>
                                    <ChartMostUsed />
                                </Box>
                                <Box className={classes.charts}>
                                    <ChartMostUsed />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display='flex' marginTop={3} align="left" marginRight={2.5}>
                                <Typography variant="h5" className={classes.subtitle}>
                                    Automações
                                </Typography>
                                <Box flexGrow={1}/>
                                <Button className={classes.btn} variant="outlined">
                                    VER TODAS
                                    <ArrowForwardIosIcon className={classes.arrowForwardIcon} />
                                </Button>
                            </Box>
                            <Box display='flex'>
                                <Box flexGrow={1} className={classes.charts}>
                                    <Paper style={{padding: '10px'}}>
                                        <Typography style={{color: '#A1A1A1', fontStyle: 'italic'}}>
                                            EM BREVE...
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Box display="flex" align="left" marginRight={2.5}>
                        <Typography variant="h5" className={classes.subtitle}>
                            Principais dispositivos
                        </Typography>
                        <Box flexGrow={1}/>
                        <Button className={classes.btn} variant="outlined">
                            VER TODOS
                            <ArrowForwardIosIcon className={classes.arrowForwardIcon} />
                        </Button>
                    </Box>
                    <Box className={classes.nodes}>
                        {this.state.data.map((node, idx) => {
                            if (idx < 2) {
                                return (
                                    <div className={classes.node} key={idx}>
                                        <Node node={node} id={node.id} name={node.name} type={node.type} is_active={node.state} updatedAt={node.updated_at} nodeConnected={node.node_connected}/>
                                    </div>
                                )
                            }
                        })}
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
        paddingRight: '20px',
    },
    btn: {
        color: '#f4f4f4',
        borderRadius: '20px',
        fontSize: '10px',
        backgroundColor: 'cadetblue',
        border: 'none',
        '&:hover': {
            backgroundColor: '#508486',
        }

    },
    nodes: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingRight: '20px',
    },
    node: {
        marginBottom: '30px',
    },
    subtitle: {
        fontVariant: 'all-small-caps',
        fontWeight: 'bold',
        color: '#363636',
    },
    arrowForwardIcon: {
        fontSize: '12px',
        marginRight: '0px',
        marginLeft: '6px',
    }
};

export default withStyles(styles)(Dashboard);
