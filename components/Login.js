import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green, red } from '@material-ui/core/colors';
import {
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Collapse,
  Fade,
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

import Router from 'next/router';

import SnackbarAlert from '@/components/SnackbarAlert';

import { localStorageKey } from '@/lib/apolloClient';

const LOGIN = gql`
  mutation login($email: String!, $password: String!, $twoFactor: String) {
    login(email: $email, password: $password, twoFactor: $twoFactor) {
      user {
        email
      }
      token
      twoFactorEnabled
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  form: {
    '& > *': {
      margin: theme.spacing(2),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  formField: {
    maxWidth: '400px',
    width: '80%',
  },
  formFieldCollapseInner: {
    width: '100%',
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonWarning: {
    backgroundColor: amber[500],
    '&:hover': {
      backgroundColor: amber[700],
    },
  },
  buttonError: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}));

function onLogin() {
  Router.replace('/');
}

export default function Login() {
  const classes = useStyles();

  // const { onLogin } = props;

  const [incorrectOpen, setIncorrectOpen] = useState(false);
  const [twoFactorEnabledOpen, setTwoFactorEnabledOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const twoFactorRef = useRef(null);

  const [
    loginMutation,
    { loading: loginLoading, client, error, data },
  ] = useMutation(LOGIN, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error && error.message && !data) {
      setErrorMessage(error.message);
      setIncorrectOpen(true);
    } else if (data) {
      const { login } = data;
      if (login.twoFactorEnabled && !login.token) {
        setTwoFactorEnabledOpen(true);
        setTwoFactorEnabled(true);
      } else {
        setSuccess(true);
        localStorage.setItem(localStorageKey, login.token);
        onLogin();
      }
    }
  }, [error, data]);

  const handleLoginExited = () => {
    client.writeQuery({
      query: gql`
        query IsLoggedIn {
          isLoggedIn @client
        }
      `,
      data: { isLoggedIn: true },
    });
  };

  const handleIncorrectClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIncorrectOpen(false);
  };

  const handleTwoFactorEnabledClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setTwoFactorEnabledOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation({
      variables: {
        email,
        password,
        twoFactor,
      },
    });
  };

  const LoginFormContents = (
    <>
      <TextField
        required
        autoFocus
        label="Email"
        variant="filled"
        type="email"
        className={classes.formField}
        disabled={loginLoading || success}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        label="Password"
        type="password"
        variant="filled"
        className={classes.formField}
        disabled={loginLoading || success}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Collapse
        in={twoFactorEnabled}
        className={classes.formField}
        onEntered={() => {
          twoFactorRef.current.focus();
        }}
      >
        <TextField
          label="2FA code"
          variant="filled"
          inputRef={twoFactorRef}
          className={classes.formFieldCollapseInner}
          required={twoFactorEnabled}
          disabled={!twoFactorEnabled || loginLoading || success}
          onChange={(e) => setTwoFactor(e.target.value)}
        />
      </Collapse>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loginLoading || success}
        >
          Login
        </Button>
        {loginLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </>
  );

  return (
    <div className={classes.wrapper}>
      <Fade in={!success} onExited={handleLoginExited}>
        <Paper className={classes.root} elevation={5}>
          <Typography variant="h3" gutterBottom>
            KiwiSheets Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {LoginFormContents}
          </form>
        </Paper>
      </Fade>
      <SnackbarAlert
        open={incorrectOpen}
        onClose={handleIncorrectClose}
        severity="error"
        message={errorMessage}
        vertical="top"
        horizontal="center"
      />
      <SnackbarAlert
        open={twoFactorEnabledOpen}
        onClose={handleTwoFactorEnabledClose}
        severity="warning"
        message="Two Factor Authentication is Enabled"
        vertical="top"
        horizontal="center"
      />
    </div>
  );
}
