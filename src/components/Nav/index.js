import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles'

import textLogo from '../../assets/img/textLogo.png'

class Nav extends Component { 
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const { classes, handlerSideBar } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.nav}>
                        <IconButton edge="start" onClick={() => handlerSideBar(true)} className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Box justifyContent='center' flexGrow={1}>
                            <img className={classes.textLogo} src={textLogo} alt="Domos' text logo"/>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>
        );
  }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    nav: {
        minHeight: '54px',
        backgroundColor: '#315151',
    },
    menuButton: {
        marginRight: '20px',
    },
    textLogo: {
        height: '35px',
        width: 'auto',
    },
}

export default withStyles(styles)(Nav);
