import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/Styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CodeIcon from '@material-ui/icons/Code';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import SettingsIcon from '@material-ui/icons/Settings';

import { logout } from '../../auth/authenticator';
import fullLogo from '../../assets/img/fullLogo.png'

class SideBar extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            isLoggingOut: false,
        }
    }

    onLogout = async () => {
        await logout();
        this.setState({ isLoggingOut: true });
    }

    render() {
        const { isLoggingOut } = this.state;
        const { classes, handlerSideBar, opened } = this.props;

        if (isLoggingOut) {
            return <Redirect to="/" push={true}/>;
        }

        const name = "Gabriel";
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={opened}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <Box className={classes.drawerHeader}>
                    <Box display='flex' marginTop={1} alignItems="center">
                        <Box justify="left">
                            <IconButton onClick={() => handlerSideBar(false)}>
                                <ChevronLeftIcon className={classes.chevronIcon} /> 
                            </IconButton>
                        </Box>
                        <Box flexGrow={1}/>
                        <Box>
                            <IconButton>
                                <SettingsIcon className={classes.settingsIcon}/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Avatar className={classes.avatar}>{name.slice(0,1)}</Avatar>
                    </Box>
                    <Box display='flex' marginBottom={1} justifyContent="center" alignItems="center">
                        <Typography className={classes.userTitle} variant="h4">Gabriel</Typography>
                    </Box>
                    <Box display='flex' marginBottom={5} justifyContent="center" alignItems="center">
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            className={classes.logoutButton}
                            onClick={this.onLogout}
                        >
                            Logout
                        </Fab>
                    </Box>
                </Box>
                <Divider />
                <List className={classes.list}>
                    <ListItem className={classes.listItem} button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemIcon><RadioButtonCheckedIcon /></ListItemIcon>
                        <ListItemText primary={'Dispositivos'} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemIcon><DataUsageIcon /></ListItemIcon>
                        <ListItemText primary={'Estatísticas'} />
                    </ListItem>
                    <ListItem className={classes.listItem} button>
                        <ListItemIcon><CodeIcon /></ListItemIcon>
                        <ListItemText primary={'Automação'} />
                    </ListItem>
                </List>
                <Box  className={classes.footer}>
                    <Box>
                        <img className={classes.fullLogo} src={fullLogo} alt="Domos' full logo" />
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <IconButton aria-label="github">
                            <GitHubIcon className={classes.githubIcon} />
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
        )
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    drawerPaper: {
        width: '190px',
    },
    drawerHeader: {
        backgroundColor: '#315151',
    },
    menuButton: {
        marginRight: '20px',
    },
    title: {
        flexGrow: 1,
    },
    chevronIcon: {
        fontSize: '25px',
        color: '#EBEBEB',
    },
    settingsIcon: {
        fontSize: '20px',
        color: '#EBEBEB',
    },
    avatar: {
        margin: '10px',
        marginBottom: '0px',
        backgroundColor: 'cadetblue',
    },
    logoutButton: {
        backgroundColor: '#ef7676',
        fontSize: '10px',
        height: '19px !important',
        '&:hover': {
            backgroundColor: '#Df6666',
            borderColor: '#0062cc',
        },
    },
    userTitle: {
        fontVariant: 'all-small-caps',
        fontWeight: 'bold',
        color: '#EBEBEB'
    },
    list: {
    },
    listItem: {
        paddingTop: '15px',
        paddingBottom: '15px',
    },
    fullLogo: {
        height: '100px',
        width: 'auto',
    },
    footer: {
        width: '100%',
        position: 'absolute',
        bottom: '0px',
    },
    githubIcon: {
        color: '#868686',
    }
}

export default withStyles(styles)(SideBar);