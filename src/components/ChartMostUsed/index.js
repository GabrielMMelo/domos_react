import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

import Chart from 'react-apexcharts';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/Styles';

import { Typography } from '@material-ui/core';
import { generateKeyPair } from 'crypto';

class ChartMostUsed extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            options: {
                plotOptions: {
                    pie: {
                        donut: {
                            size: '40%',
                        }
                    },
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
            series: [44, 55, 41, 17, 15],
        }
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
            <Paper className={classes.paper}>
                <Box align="left">
                    <Typography className={classes.subtitle}>
                        Dispositivos mais usados
                    </Typography>
                </Box>
                <Chart options={this.state.options} series={this.state.series} type="donut" width={'100%'} height={200} />
            </Paper>
        )
    }
}

const styles = {
    paper: {
        padding: '20px',
        borderRadius: '6px',
        color: 'gray',
    },
    subtitle: {
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.54)',
        letterSpacing: '0.00938em',
        lineHeight: '1.3',
    }
};

export default withStyles(styles)(ChartMostUsed);
