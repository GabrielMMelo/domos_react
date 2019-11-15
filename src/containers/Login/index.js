import React, {Component} from "react";

import { Box, Button, Checkbox, Grid, IconButton, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import PasswordField from 'material-ui-password-field';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import LoginForm from "../../components/forms/LoginForm";
import RegisterForm from "../../components/forms/RegisterForm";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormLoginSelected: true,
            isSnackbarActivated: false,
            snackbarMessage: '',
        }
    }

    formSelectorStyle = (e) => {
        const { isFormLoginSelected } = this.state;

        if (e === 'login') 
            return { 
                backgroundColor: isFormLoginSelected ? '#fff' : '#eae8e8',
                color: isFormLoginSelected ? '#111' : '#989898',
                boxShadow: isFormLoginSelected ? '-2px -1px 1px -2px rgba(0,0,0,0.2), 0px -1px 1px -2px rgba(0,0,0,0.14), 0px -2px 3px -2px rgba(0,0,0,0.12)' : 'none',
            };
        else  // register
            return { 
                backgroundColor: isFormLoginSelected ? '#eae8e8' : '#fff',
                color: isFormLoginSelected ? '#989898' : '#111',
                boxShadow: isFormLoginSelected ? 'none' : '-2px -1px 1px -2px rgba(0,0,0,0.2), 0px -1px 1px -2px rgba(0,0,0,0.14), 0px -2px 3px -2px rgba(0,0,0,0.12)',
            };
    }

    fireSnackbar = (msg) => {
        this.setState({ isSnackbarActivated: true, snackbarMessage: msg })
    }

    closeSnackbar = () => {
        this.setState({ isSnackbarActivated: false })
    }

    render() {

        const { isFormLoginSelected, isSnackbarActivated, snackbarMessage} = this.state;
        const { classes } = this.props;

            return (
            <>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={isSnackbarActivated}
                    autoHideDuration={6000}
                    onClose={this.closeSnackbar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackbarMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.closeSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <Box alignContent="center" justifyContent='center' className={ classes.background }>
                    <Box justifyContent='center' className={ classes.container }>
                        <Grid container>
                            <Grid item xs={6}>
                                <Box display="flex" style={this.formSelectorStyle('login')} className={classes.formSelector} justifyContent="center" alignItems="center">
                                    <CustomFormSelectorButton disableRipple onClick={() => this.setState({ isFormLoginSelected: true })} className={classes.formSelectorButton}>
                                        Já sou cadastrado
                                    </CustomFormSelectorButton>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" style={this.formSelectorStyle('register')} className={classes.formSelector} justifyContent="center" alignItems="center">
                                    <CustomFormSelectorButton disableRipple onClick={() => this.setState({ isFormLoginSelected: false })} className={classes.formSelectorButton}>
                                        Não sou cadastrado
                                    </CustomFormSelectorButton>
                                </Box>
                            </Grid>
                        </Grid>
                        <Paper className={ classes.paper }>
                            {
                            isFormLoginSelected
                            ?
                            <LoginForm />
                            :

                            <RegisterForm fireSnackbar={this.fireSnackbar}/>

                            }
                        </Paper>
                    </Box>
                </Box>
            </>
            );
    }
}
const CustomFormSelectorButton = withStyles({
    root: {
        '&:focus': {
            outline: '0'
        },
        '&:hover': {
            backgroundColor: 'inherit',
        },
    },
})(Button);

const CustomButton = withStyles({
    root: {
        borderRadius: '30px',
        backgroundColor: 'cadetblue',
        color: '#EBEBEB',
        '&:hover': {
            backgroundColor: '#315151',
        },
    },
})(Button);

const CustomPasswordField = withStyles({
    root: {
        '&:hover':{
        },
        '&:after': {
            borderBottom: '2px solid cadetblue', 
        }
    },
})(PasswordField);

const CustomCheckbox = withStyles({
    root: {
        '&:hover': {
            backgroundColor: '#5f9ea00f',
        },
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: 'cadetblue',
            '&:hover': {
                backgroundColor: '#5f9ea00f'
            }
        },
    }
})(Checkbox);

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'cadetblue',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E0E0',
        },
        '&:hover fieldset': {
            borderColor: 'cadetblue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'cadetblue',
        },
    },
    '& fieldset': {
        borderRadius: '30px',
    },
    '& input': {
        color: '#315151',
    },
  },
})(TextField);

const styles = {
    background: {
        height: '100%',
    },
    container: {
        position: 'relative',
        top: '25%',
        left: '35%',
        width: '28%',
    },
    formSelector: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: 'rgba(0,0,0,0.4)',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        height: '40px',
    },
    formSelectorButton: {
        '&:hover': {
            backgroundcolor: '#fff',
        },
        width: '100%',
        height: '100%',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        fontFamily: 'inherit',
        fontSize: '12px',
    },
    paper: {
        padding: '20px',
        borderRadius: '0px',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '30px',
    },
    textField: {
        width: '80%',
        marginBottom: '20px',
    },
    button: {
        width: '80%',
    },
    fullLogo: {
        height: '150px',
    },
    rememberMeBox: {
        width: '80%',
        marginLeft: '8%',
        marginTop: '-5%',
    },
    rememberMeText: {
        fontSize: '12px',
        color: '#315151',
    },
    wrongCredentials: {
        width: '100%',
        color: 'red',
    },
    wrongCredentialsText: {
        fontSize: '14px',
        fontVariant: 'all-small-caps',
    },
};

export default withStyles(styles)(Login);
