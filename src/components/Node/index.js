import React, { Component } from 'react';

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography'

import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/Styles';

import { getToken } from '../../auth/authenticator';
import wsHost from '../../services/ws';

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_active: props.is_active,
            wsConnected: false,
        };

        this.nodeSocket = new WebSocket(
            wsHost + `device/${props.id}/`
        );
    }

    componentDidMount() {
        const { wsConnected } = this.state;

        this.nodeSocket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            let state = parseInt(Number(data['state']));
            this.setState({is_active: state});
        };

        this.nodeSocket.onopen = () => {
            this.nodeSocket.send(JSON.stringify({
                'state': this.props.is_active,
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
        const { classes, name, type } = this.props;

            /*
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
            */
        return (
            <Card className={classes.card}>
                <CardContent>
                            <Box display="flex" alignItems="center">
                                <Box marginRight={1}>
                                    <Typography variant="h5" component="h2">
                                        {name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography className={wsConnected ? classes.textGreen : classes.textRed} gutterBottom>
                                        {wsConnected ? 'CONECTADO' : 'DESCONECTADO'}
                                    </Typography>
                                </Box>
                                <Box flexGrow={2} align="right">
                                    <SettingsIcon className={classes.settings}/>
                                </Box>
                            </Box>
                            <Box align="left">
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {type}
                                </Typography>
                            </Box>
                </CardContent>
                <CardActions>
                    <Box display="flex" alignItems="center" align="center">
                        <Box>
                            <StyledSwitch
                                checked={this.state.is_active}
                                onChange={this.toggleState}
                                className={classes.switch}
                                value="checkedB"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        );
    }
}
const StyledSwitch = withStyles({
    checked: {
        color: 'cadetblue !important',
    },
    track: {
        backgroundColor: 'cadetblue !important',
    }
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
  },
  settings: {
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
};

export default withStyles(styles)(Node);
