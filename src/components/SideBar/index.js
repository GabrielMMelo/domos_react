import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/Styles';

class SideBar extends Component { 
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        const { classes, handlerSideBar, opened } = this.props;

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
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => handlerSideBar(false)}>
                        <ChevronLeftIcon /> 
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={'Dispositivos'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={'Estatísticas'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={'Automação'} />
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: '20px',
    },
    title: {
        flexGrow: 1,
    },
}

export default withStyles(styles)(SideBar);