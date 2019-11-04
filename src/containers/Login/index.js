import React, {Component} from "react";
import { Redirect } from 'react-router-dom';

import { Box, Button, Checkbox, Card, Paper, TextField, Typography } from '@material-ui/core';
import PasswordField from 'material-ui-password-field'
import { withStyles } from '@material-ui/core/styles'

import { login, isAuthenticated, getUserInfo } from '../../auth/authenticator';
import fullLogo from '../../assets/img/fullLogo.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            wrongCredentials: false,
            rememberMe: false,
        }
    }

    onLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            await login(email, password);
            await getUserInfo();
        }
        catch(e) {
            this.setState({ wrongCredentials: true})
        }
        this.forceUpdate();
    }

    render() {

        const { wrongCredentials, rememberMe } = this.state;
        const { classes } = this.props;

        if (isAuthenticated())
            return <Redirect to='/' push={true}/>;
        else
            return (
                <Box alignContent="center" justifyContent='center' className={ classes.background }>
                    <Box justifyContent='center' className={ classes.container }>
                        <Paper className={ classes.paper }>
                            <form onSubmit={this.onLogin}>
                            <Box>
                                <img className={classes.fullLogo} src={fullLogo} alt="Domos' full logo" />
                            </Box>
                            <Box marginTop={3}>
                                <CustomTextField
                                    className={ classes.textField }
                                    type="email"
                                    onChange={(e) => this.setState({ email: e.target.value }) }
                                    placeholder="E-mail"
                                />
                                <CustomPasswordField
                                    className={ classes.textField }
                                    hintText="At least 8 characters"
                                    floatingLabelText="Enter your password"
                                    errorText="Your password is too short"
                                    variant="outlined"
                                    placeholder="Senha"
                                    onChange={(e) => this.setState({ password: e.target.value }) }
                                />
                                <Box display='flex' className={classes.rememberMeBox} alignItems='center'>
                                    <CustomCheckbox
                                        className={classes.rememberMe}
                                        checked={rememberMe}
                                        onChange={() => this.setState({ rememberMe: !rememberMe })}
                                        value="rememberMe"
                                        inputProps={{
                                            'aria-label': 'primary checkbox',
                                        }}
                                    />
                                    <Typography className={classes.rememberMeText}>
                                        Me mantenha logado
                                    </Typography>
                                </Box>
                                { 
                                wrongCredentials
                                ?
                                <Box className={classes.wrongCredentials} justifyContent='center'>
                                    <Typography className={classes.wrongCredentialsText}>E-mail e/ou senha incorreto(s)</Typography>
                                </Box>
                                :
                                <></>
                                }
                            </Box>
                            <Box marginTop={2}>
                                <CustomButton variant="contained" className={classes.button} type="submit">Login</CustomButton>
                            </Box>
                            </form>
                        </Paper>
                    </Box>
                </Box>
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
    paper: {
        padding: '20px',
        borderRadius: '30px'
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
