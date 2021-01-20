import { useState } from 'react';
import {
  AccordionActions,
  AccordionDetails,
  Button,
  CircularProgress,
  Fade,
  TextField,
  makeStyles,
  Divider,
  Grid,
} from '@material-ui/core';

import { useMutation, gql } from '@apollo/client';

import SnackbarAlert from '@/components/SnackbarAlert';

const CHANGE_PASSWORD = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  personalRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  details: {
    alignItems: 'center',
  },
  helper: {
    borderLeftWidth: '2px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider,
    padding: theme.spacing(1, 2),
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

  button: {
    margin: theme.spacing(1),
  },
}));

export default function ChangePasswordPanel() {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD, {
    errorPolicy: 'none',
    onError: () => {
      setSnackbarOpen(true);
    },
    onCompleted: () => {
      setSnackbarOpen(true);
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (oldPassword === newPassword) {
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      return;
    }

    changePassword({
      variables: {
        oldPassword,
        newPassword,
      },
    });
  };

  const textErrorLabel = () => {
    if (!oldPassword) {
      return ' ';
    }

    if (oldPassword === newPassword) {
      return 'Old password is the same';
    }

    return ' ';
  };

  const textErrorConfirmLabel = () => {
    if (newPassword !== newPasswordConfirm && newPasswordConfirm) {
      return "Passwords don't match";
    }
    return ' ';
  };

  const textError = () => textErrorLabel() !== ' ';
  const textErrorConfirm = () => textErrorConfirmLabel() !== ' ';

  return (
    <>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item sm={4}>
            {/* Use form only on old password to allow for autofillers to work */}
            <form onSubmit={handleSave}>
              <TextField
                variant="outlined"
                type="password"
                label="Old Password"
                value={oldPassword}
                disabled={loading}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </form>
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              type="password"
              label="New Password"
              value={newPassword}
              disabled={loading}
              error={textError()}
              helperText={textErrorLabel() || ' '}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item sm={4}>
            <TextField
              variant="outlined"
              type="password"
              label="New Password Again"
              value={newPasswordConfirm}
              disabled={loading}
              error={textErrorConfirm()}
              helperText={textErrorConfirmLabel()}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              onSubmit={handleSave}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSave(e);
              }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Fade in>
          <div className={classes.buttonWrapper}>
            <Button
              color="primary"
              size="small"
              disabled={loading}
              onClick={handleSave}
            >
              Save
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Fade>
      </AccordionActions>

      <SnackbarAlert
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={error ? 'error' : 'success'}
        message={error ? error.message : 'Password Changed'}
        vertical="top"
        horizontal="center"
      />
    </>
  );
}
