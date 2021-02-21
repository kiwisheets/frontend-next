import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { authenticator } from 'otplib';

import FullPanelSpinner from '@/components/FullPanelSpinner';

import TwoFactorPanel from '@/components/TwoFactorPanel';
import ChangePasswordPanel from '@/components/ChangePasswordPanel';
import { useMeQuery } from '@/lib/graphql';

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

export default function Profile() {
  const classes = useStyles();

  const [accordianExpanded, setAccordianExpanded] = useState('personal');

  const {
    data: personalData,
    loading: personalLoading,
    // error: personalError,
  } = useMeQuery({
    fetchPolicy: 'cache-first',
  });

  const [twoFactorSecret, setTwoFactorSecret] = useState(
    authenticator.generateSecret(),
  );

  const otpAuth = useMemo(() => {
    if (personalData && personalData.me) {
      return authenticator.keyuri(
        personalData.me.email,
        personalData.me.company.name,
        twoFactorSecret,
      );
    }
    return '';
  }, [personalData, twoFactorSecret]);

  if (personalLoading) {
    return <p>Loading User Data...</p>;
  }

  const handleAccordianToggle = (panel) => (event, isExpanded) => {
    setAccordianExpanded(isExpanded ? panel : false);
  };

  const handleRegenerateTwoFactorSecret = () => {
    setTwoFactorSecret(authenticator.generateSecret());
  };

  return (
    <Fade in>
      <div className={classes.root}>
        <Accordion
          expanded={accordianExpanded === 'personal'}
          onChange={handleAccordianToggle('personal')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Profile</Typography>
            <Typography className={classes.secondaryHeading}>
              Personal details and info
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {personalLoading ? (
              <FullPanelSpinner />
            ) : (
              <form
                className={classes.personalRoot}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Username (Login)"
                  variant="outlined"
                  disabled
                  defaultValue={personalData.me.email}
                />
                <TextField
                  label="First name"
                  variant="outlined"
                  defaultValue={personalData.me.firstname}
                />
                <TextField
                  label="Last name"
                  variant="outlined"
                  defaultValue={personalData.me.lastname}
                />
              </form>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={accordianExpanded === 'password'}
          onChange={handleAccordianToggle('password')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Password</Typography>
            <Typography className={classes.secondaryHeading}>
              Change your password
            </Typography>
          </AccordionSummary>
          <ChangePasswordPanel />
        </Accordion>
        <Accordion
          expanded={accordianExpanded === '2fa'}
          onChange={handleAccordianToggle('2fa')}
          TransitionProps={{ unmountOnExit: false }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>2FA</Typography>
            <Typography className={classes.secondaryHeading}>
              Two-Factor Authentication Settings
            </Typography>
          </AccordionSummary>
          <TwoFactorPanel
            otpAuth={otpAuth}
            secret={twoFactorSecret}
            onRegenerateClick={handleRegenerateTwoFactorSecret}
          />
        </Accordion>
        <Accordion
          expanded={accordianExpanded === 'other'}
          onChange={handleAccordianToggle('other')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Other settings</Typography>
            <Typography className={classes.secondaryHeading}>
              Some other settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque dapibus in erat sit amet rutrum. Curabitur viverra
              accumsan tincidunt. Ut tristique tincidunt felis sit amet
              volutpat. Aenean quis orci finibus, malesuada mauris vel,
              efficitur velit. Praesent efficitur lectus mi, in sollicitudin
              odio venenatis a. Vestibulum a nibh sit amet urna consectetur
              dictum. Donec vehicula auctor enim a vehicula. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Duis lacinia
              sodales libero, vel ornare tellus condimentum nec. Curabitur arcu
              urna, mattis hendrerit vehicula facilisis, molestie eu augue.
              Donec hendrerit leo quis odio laoreet lobortis. Donec dui nisi,
              laoreet at ipsum quis, porta condimentum augue. Nam in neque
              scelerisque, aliquam purus vitae, maximus erat. Curabitur at
              ligula tincidunt, commodo eros eu, congue tortor.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={accordianExpanded === 'panel4'}
          onChange={handleAccordianToggle('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
            <Typography className={classes.secondaryHeading}>
              See how we store and use your data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque dapibus in erat sit amet rutrum. Curabitur viverra
              accumsan tincidunt. Ut tristique tincidunt felis sit amet
              volutpat. Aenean quis orci finibus, malesuada mauris vel,
              efficitur velit. Praesent efficitur lectus mi, in sollicitudin
              odio venenatis a. Vestibulum a nibh sit amet urna consectetur
              dictum. Donec vehicula auctor enim a vehicula. Interdum et
              malesuada fames ac ante ipsum primis in faucibus. Duis lacinia
              sodales libero, vel ornare tellus condimentum nec. Curabitur arcu
              urna, mattis hendrerit vehicula facilisis, molestie eu augue.
              Donec hendrerit leo quis odio laoreet lobortis. Donec dui nisi,
              laoreet at ipsum quis, porta condimentum augue. Nam in neque
              scelerisque, aliquam purus vitae, maximus erat. Curabitur at
              ligula tincidunt, commodo eros eu, congue tortor.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Fade>
  );
}
