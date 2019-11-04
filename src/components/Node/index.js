import React, { Component } from 'react';
import Timer from 'easytimer.js';

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'

import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/styles';

import { getToken } from '../../auth/authenticator';
import wsHost from '../../services/ws';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            isActive: props.is_active,
            nodeConnected: props.nodeConnected,
            wsConnected: false,
            timer: new Timer(),
            uptime: '',
        };

        this.nodeSocket = new WebSocket(
            wsHost + `device/${props.id}/`
        );
    }

    componentDidMount() {
        const { timer } = this.state;
        const { updatedAt } = this.props;
        let difference = new Date() - new Date(updatedAt);
        timer.start({
            startValues: {
                seconds: difference/1000,  // milliseconds to seconds
            },
        });
        timer.addEventListener("secondsUpdated", this.tick);

        this.nodeSocket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if (data['state'] !== undefined) {
                let state = parseInt(Number(data['state']));
                this.resetTimer();
                this.setState({isActive: state});
            }
            if (data['node_connected'] !== undefined){
                this.setState({ nodeConnected: data['node_connected']})
            }
        };

        this.nodeSocket.onopen = () => {
            this.nodeSocket.send(JSON.stringify({
                'state': this.props.isActive,
                "token": getToken(),
            }));
            this.setState({ wsConnected: true });
        }

        this.nodeSocket.onclose = (e) => {
            this.setState({ wsConnected: false });
            console.error('Node socket closed unexpectedly');
        };
    };

    toggleState = () => {
        this.resetTimer();

        this.setState({
            isActive: this.state.isActive ? 0 : 1,
            },  () =>  {
                this.nodeSocket.send(JSON.stringify({
                    'state': this.state.isActive,
                }));
            }
        );
    };

    tick = () => {
        let { timer } = this.state;
        const uptime = timer.getTimeValues().toString();
        this.setState({ uptime });
    }

    resetTimer = () => {
        this.setState({ timer: null });  // destroy current timer (is there any better approach?)
        let timer = new Timer();
        timer.start();
        this.setState({ timer, uptime: '' });
    }

    render() {

        const { wsConnected, nodeConnected, isActive, uptime } = this.state;
        const { classes, name, type } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Box marginRight={1}>
                            <Typography variant="h5" component="h2">
                                {name}
                            </Typography>
                        </Box>
                        <Box display="flex">
                            <Typography className={wsConnected ? classes.textGreen : classes.textRed} gutterBottom>
                                {wsConnected ? 'WS CONECTADO' : 'WS DESCONECTADO'}
                            </Typography>
                            <Typography className={nodeConnected ? classes.textGreen : classes.textRed} gutterBottom>
                                {nodeConnected ? 'NODE CONECTADO' : 'NODE DESCONECTADO'}
                            </Typography>
                        </Box>
                        <Box flexGrow={2} align="right">
                            <IconButton style={{padding: '0px'}}>
                                <SettingsIcon className={classes.settingsIcon}/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Box align="left">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {type}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Box display="flex" alignItems="center" align="center" margin={1}>
                        <Typography className={classes.onOff} style={{ color: (isActive ? '#D1D1D1' : '#555')}}>
                            Off
                        </Typography>
                        <StyledSwitch
                            checked={isActive}
                            onChange={this.toggleState}
                            className={classes.switch}
                            value="checkedB"
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        <Typography className={classes.onOff} style={{ color: (isActive ? '#555' : '#D1D1D1')}}>
                            On
                        </Typography>
                    </Box>
                    <Box flexGrow={1}/>
                    {
                    isActive && uptime
                    ?
                    <Typography className={classes.uptime}>
                        <Box style={{fontSize: '18px'}} component='span'>UPTIME:</Box> {uptime}
                    </Typography>
                    :
                    <></>
                    }
                </CardActions>
            </Card>
        );
    }
}
const StyledSwitch = withStyles({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: '5px',
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: 'white',
            '& + $track': {
                backgroundColor: 'cadetblue',
                opacity: 1,
                border: 'none',
            },
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid #D1D1D1`,
        backgroundColor: '#E1E1E1',
        opacity: 1,
        transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '& .Mui-checked': {
            backgroundColor: 'cadetblue !important',
        }
    },
    checked: {
    },
})(Switch);

const styles = {
  card: {
    minWidth: 275,
    borderRadius: '6px',
  },
  textGreen: {
    fontSize: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
    backgroundColor: '#efefef',
    color: '#0080009c',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: '1px solid #dfdfdf',
    marginRight: '10px',
  },
  textRed: {
    fontSize: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
    backgroundColor: '#efefef',
    color: '#ff2e2e70',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: '1px solid #dfdfdf',
    marginRight: '10px',
  },
  settingsIcon: {
      color: 'rgba(0, 0, 0, 0.64)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  onOff: {
      fontVariant: 'all-small-caps',
      fontSize: '15px',
      fontWeight: 'bold',
      marginBottom: '2px',
  },
  uptime: {
      fontSize: '25px',
      fontStyle: 'italic',
      fontVariant: 'all-small-caps',
      color: '#D1D1D1',
      marginRight: '10px',
  }
};

export default withStyles(styles)(Node);
