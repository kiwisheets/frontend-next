import { CircularProgress, makeStyles } from '@material-ui/core';

const useFullPageSpinnerStyles = makeStyles(() => ({
  spinner: {
    fontSize: '4em',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function FullPageSpinner() {
  const classes = useFullPageSpinnerStyles();
  return (
    <div key="spinner" className={classes.spinner}>
      <CircularProgress />
    </div>
  );
}
