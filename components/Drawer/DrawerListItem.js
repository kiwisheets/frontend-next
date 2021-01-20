import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { Context } from './Drawer';
import Link from '../Link';

const DrawerListItem = (props) => {
  const { to, icon, children } = props;

  const onClick = useContext(Context);

  return (
    <ListItem
      button
      component={Link}
      href={to}
      onClick={onClick}
      key={children}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={children} />
    </ListItem>
  );
};

DrawerListItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node,
  children: PropTypes.string.isRequired,
};

DrawerListItem.defaultProps = {
  icon: null,
};

export default DrawerListItem;
