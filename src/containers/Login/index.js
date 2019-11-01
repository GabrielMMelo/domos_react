import React, {Component} from "react";
import { Redirect } from 'react-router-dom';

import { Box, Button, Paper, Card, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/Styles'

import { login, isAuthenticated, getUserInfo } from '../../auth/authenticator';
import fullLogo from '../../assets/img/fullLogo.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            wrongCredentials: false,
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

        const { wrongCredentials } = this.state;
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
                                    variant="outlined"
                                    type="email"
                                    onChange={(e) => this.setState({ email: e.target.value }) }
                                    placeholder="E-mail"
                                />
                                <CustomTextField
                                    className={ classes.textField }
                                    type="password"
                                    variant="outlined"
                                    onChange={(e) => this.setState({ password: e.target.value }) }
                                    placeholder="Senha"
                                />
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

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
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
        marginBottom: '10px',
    },
    button: {
        width: '80%',
    },
    fullLogo: {
        height: '150px',
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
