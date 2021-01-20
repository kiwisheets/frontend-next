import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';

import { ExpandMore, ExpandLess } from '@material-ui/icons';

import useStickyState from '@/lib/useStickyState';
import Link from '../Link';

import { Context } from './Drawer';

const useStyles = makeStyles((theme) => ({
  nested: {
    '& > *': {
      paddingLeft: theme.spacing(4),
    },
    backgroundColor: theme.palette.grey[100],
  },
}));

const NestedDrawerList = (props) => {
  const { to, text, icon, children } = props;
  const classes = useStyles();

  const onClick = useContext(Context);

  const [open, setOpen] = useStickyState(false, `drawer-nested-${text}`);

  const handleExpandClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button component={Link} href={to} onClick={onClick}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
        <ListItemSecondaryAction>
          <IconButton onClick={handleExpandClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.nested}>{children}</List>
      </Collapse>
    </List>
  );
};

NestedDrawerList.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

NestedDrawerList.defaultProps = {
  to: '',
  icon: null,
};

export default NestedDrawerList;
