import { CircularProgress, makeStyles } from '@material-ui/core';

const useFullPanelSpinnerStyles = makeStyles(() => ({
  root: {
    fontSize: '4em',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function FullPanelSpinner() {
  const classes = useFullPanelSpinnerStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
