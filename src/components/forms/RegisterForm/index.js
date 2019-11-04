import React, { Component } from 'react';

import { Box, Button, TextField, Typography } from '@material-ui/core';
import PasswordField from 'material-ui-password-field'
import { withStyles } from '@material-ui/core/styles'

import api from '../../../services/api';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerData: {},
            registerError: false,
            registerErrorMsg: '',
        }
    }

    onRegister = async (e) => {
        e.preventDefault();
        const { registerData } = this.state;
        const { fireSnackbar } = this.props;

        await api.post('auth/registration/', registerData)
            .then((res) => {
                fireSnackbar("E-mail de confirmação enviado!");
            })
            .catch((e) => {
                let response = e.response.data;
                this.setState({ registerError: true, registerErrorMsg: Object.keys(response)[0] + ':' + response[Object.keys(response)[0]]});
            });
    }

    registerHandler = (e) => {
        const { registerData } = this.state;

        registerData[e.target.name] = e.target.value;

        if (e.target.name === 'password2') 
            if (e.target.value !== registerData['password1'])
                this.setState({ registerError: true, registerErrorMsg: 'Senhas não coincidem'});
            else
                this.setState({ registerError: false, registerErrorMsg: ''});

        this.setState({ registerData });
    }
    render() {

        const { registerError, registerErrorMsg } = this.state;
        const { classes } = this.props;

        return (
            <form onSubmit={this.onRegister}>
                <Box marginTop={3}>
                    <CustomTextField
                        className={ classes.textField }
                        type="text"
                        name="first_name"
                        onChange={(e) => this.registerHandler(e)}
                        placeholder="Nome"
                    />
                    <CustomTextField
                        className={ classes.textField }
                        type="text"
                        name="last_name"
                        onChange={(e) => this.registerHandler(e)}
                        placeholder="Sobrenome"
                    />
                    <CustomTextField
                        className={ classes.textField }
                        type="email"
                        name="email"
                        onChange={(e) => this.registerHandler(e)}
                        placeholder="E-mail"
                    />
                    <CustomPasswordField
                        className={ classes.textField }
                        hintText="At least 8 characters"
                        floatingLabelText="Enter your password"
                        errorText="Your password is too short"
                        variant="outlined"
                        name="password1"
                        placeholder="Senha"
                        onChange={(e) => this.registerHandler(e)}
                    />
                    <CustomPasswordField
                        className={ classes.textField }
                        hintText="At least 8 characters"
                        floatingLabelText="Enter your password"
                        errorText="Your password is too short"
                        variant="outlined"
                        name="password2"
                        placeholder="Repita a senha"
                        onChange={(e) => this.registerHandler(e)}
                    />
                    { 
                    registerError
                    ?
                    <Box className={classes.wrongCredentials} justifyContent='center'>
                        <Typography className={classes.wrongCredentialsText}>{registerErrorMsg}</Typography>
                    </Box>
                    :
                    <></>
                    }
                </Box>
                <Box marginTop={3} marginBottom={2}>
                    <CustomButton variant="contained" className={classes.button} type="submit">Cadastrar</CustomButton>
                </Box>
            </form>

        );

    }
}

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

export default withStyles(styles)(RegisterForm);