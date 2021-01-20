/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Row as GridRow, Col as GridCol } from 'react-grid-system';

const useStyles = makeStyles((theme) => ({
  row: {
    paddingBottom: theme.spacing(1),
  },
  col: {
    paddingBottom: theme.spacing(2),
  },
}));

const Row = (props) => {
  const classes = useStyles();

  return <GridRow className={classes.row} {...props} />;
};

Row.propTypes = {
  /**
   * Content of the element
   */
  children: PropTypes.node.isRequired,
  /**
   * Vertical column alignment
   */
  align: PropTypes.oneOf(['normal', 'start', 'center', 'end', 'stretch']),
  /**
   * Horizontal column alignment
   */
  justify: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'between',
    'around',
    'initial',
    'inherit',
  ]),
  /**
   * No gutter for this row
   */
  nogutter: PropTypes.bool,
  /**
   * Custom gutter width for this row
   */
  gutterWidth: PropTypes.number,
  /**
   * Optional styling
   */
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  /**
   * Set to apply some debug styling
   */
  debug: PropTypes.bool,
  /**
   * Use your own component
   */
  component: PropTypes.elementType,
  /**
   * Whether the cols should not wrap
   */
  nowrap: PropTypes.bool,
};

Row.defaultProps = {
  align: 'normal',
  justify: 'start',
  nogutter: false,
  gutterWidth: null,
  style: {},
  debug: false,
  component: 'div',
  nowrap: false,
};

const Col = (props) => {
  const classes = useStyles();

  return <GridCol className={classes.col} {...props} />;
};

Col.propTypes = {
  /**
   * Content of the column
   */
  children: PropTypes.node,
  /**
   * The width of the column for screenclass `xs`, either a number between 0 and 12, or "content"
   */
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['content'])]),
  /**
   * The width of the column for screenclass `sm`, either a number between 0 and 12, or "content"
   */
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['content'])]),
  /**
   * The width of the column for screenclass `md`, either a number between 0 and 12, or "content"
   */
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['content'])]),
  /**
   * The width of the column for screenclass `lg`, either a number between 0 and 12, or "content"
   */
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['content'])]),
  /**
   * The width of the column for screenclass `xl`, either a number between 0 and 12, or "content"
   */
  xl: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['content'])]),
  /**
   * The width of the column for screenclass `xxl`, either a number between 0 and 12, or "content"
   */
  xxl: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['content'])]),
  /**
   * A fixed width of the column for all screenclasses"
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The offset of this column for all screenclasses
   */
  offset: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  /**
   * The amount this column is pushed to the right for all screenclasses
   */
  push: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  /**
   * The amount this column is pulled to the left for all screenclasses
   */
  pull: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  /**
   * Optional styling
   */
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
  /**
   * Set to apply some debug styling
   */
  debug: PropTypes.bool,
  /**
   * Use your own component
   */
  component: PropTypes.elementType,
};

Col.defaultProps = {
  children: null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  xxl: null,
  width: null,
  offset: {},
  push: {},
  pull: {},
  style: {},
  debug: false,
  component: 'div',
};

export { Col, Row };
