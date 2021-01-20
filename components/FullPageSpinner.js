import { CircularProgress, makeStyles } from '@material-ui/core';

const useFullPageSpinnerStyles = makeStyles(() => ({
  root: {
    fontSize: '4em',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function FullPageSpinner() {
  const classes = useFullPageSpinnerStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
