import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/Styles'


// TODO: aplicar redux to get token/user
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
                        <Typography variant="h6" className={classes.title}>
                            DOMOS
                        </Typography>
                        {
                            this.state.token
                            ?
                            <Typography>Seu nome</Typography>
                            :
                            <Button variant="contained">Login</Button>
                        }
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
        backgroundColor: 'cadetblue',
    },
    menuButton: {
        marginRight: '20px',
    },
    title: {
        flexGrow: 1,
    },
}

export default withStyles(styles)(Nav);
