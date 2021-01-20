import Proptypes from 'prop-types';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  snackbarTop: {
    top: 90,
  },
}));

const SnackbarAlert = ({
  open,
  onClose,
  severity,
  message,
  vertical,
  horizontal,
}) => {
  const classes = useStyles();

  const snackbarClassname = () => {
    if (vertical === 'top' && horizontal === 'center') {
      return classes.snackbarTop;
    }
    return '';
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
      className={snackbarClassname()}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

SnackbarAlert.propTypes = {
  open: Proptypes.bool.isRequired,
  onClose: Proptypes.func.isRequired,
  severity: Proptypes.string.isRequired,
  message: Proptypes.string.isRequired,
  vertical: Proptypes.string,
  horizontal: Proptypes.string,
};

SnackbarAlert.defaultProps = {
  vertical: 'top',
  horizontal: 'right',
};

export default SnackbarAlert;
