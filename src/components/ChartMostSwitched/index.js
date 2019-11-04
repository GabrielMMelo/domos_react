import React, { Component } from 'react';

import Chart from 'react-apexcharts';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

import api from '../../services/api';
import { getToken } from '../../auth/authenticator';

class ChartMostSwitched extends Component { 
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
                legend: {
                    position: 'right',
                    horizontalAlign: 'left', 
                },
                yaxis: {
                labels: {
                    formatter: function (value) {
                        if (value) {
                            return value + ' switches';
                        }
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
        api
            .get("activity/most_switched_last_month/", { headers: { Authorization: `Token ${getToken()}` } })
            .then(res => {
                let labels = res.data.activities.labels;
                let series = res.data.activities.series;

                console.log("DATA", labels, series)
                this.setState({ 
                    options: { ...this.state.options, labels },
                    series: series,
                });
            })
            .catch(err => console.log(err));
    };

    render() {

        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Box align="left">
                    <Typography className={classes.subtitle}>
                        Contagem de switches (últimos 30 dias)
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

export default withStyles(styles)(ChartMostSwitched);
