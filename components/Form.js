import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Tooltip,
} from '@material-ui/core';

import { Row, Col } from 'react-grid-system';

const CreateFormContext = () =>
  createContext({
    loading: false,
    disabled: false,
  });

const FormTextField = (props) => {
  const { label, onChange, context, value, type, required } = props;
  const { loading, disabled } = useContext(context);

  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <>
      {disabled ? (
        <Tooltip title={disabled ? 'This field is disabled' : null}>
          <span>
            <TextField
              variant="outlined"
              label={label}
              disabled={loading || disabled}
              onChange={handleChange}
              value={value}
              fullWidth
              type={type}
              required={required}
            />
          </span>
        </Tooltip>
      ) : (
        <TextField
          variant="outlined"
          label={label}
          disabled={loading || disabled}
          onChange={handleChange}
          value={value}
          fullWidth
          type={type}
          required={required}
        />
      )}
    </>
  );
};

FormTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  context: PropTypes.shape({
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
  required: PropTypes.bool,
};

FormTextField.defaultProps = {
  type: null,
  required: false,
};

const AddressForm = (props) => {
  const { onChange, context } = props;

  const [name, setName] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState('');

  const handleChange = () => {
    onChange({
      name,
      street1,
      street2,
      city,
      state,
      postalCode,
      country,
    });
  };

  return (
    <FormRow>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="Name"
          onChange={(e) => {
            setName(e);
            handleChange();
          }}
          required
          value={name}
        />
      </FormCol>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="Street Address Line 1"
          onChange={(e) => {
            setStreet1(e);
            handleChange();
          }}
          required
          value={street1}
        />
      </FormCol>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="Street Address Line 2"
          onChange={(e) => {
            setStreet2(e);
            handleChange();
          }}
          value={street2}
        />
      </FormCol>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="City"
          onChange={(e) => {
            setCity(e);
            handleChange();
          }}
          required
          value={city}
        />
      </FormCol>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="State"
          onChange={(e) => {
            setState(e);
            handleChange();
          }}
          value={state}
        />
      </FormCol>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="Postal Code"
          onChange={(e) => {
            const pc = parseInt(e, 10);
            setPostalCode(pc);
            handleChange();
          }}
          required
          value={postalCode}
          type="number"
        />
      </FormCol>
      <FormCol width={12}>
        <FormTextField
          context={context}
          label="Country"
          onChange={(e) => {
            setCountry(e);
            handleChange();
          }}
          required
          value={country}
        />
      </FormCol>
    </FormRow>
  );
};

AddressForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  context: PropTypes.shape({
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
};

const useFormSubmitButtonStyles = makeStyles((theme) => ({
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
}));

const FormSubmitButton = (props) => {
  const { context, children, variant } = props;
  const { loading, disabled } = useContext(context);

  const classes = useFormSubmitButtonStyles();

  return (
    <div className={classes.buttonWrapper}>
      <Button
        variant={variant}
        color="primary"
        size="medium"
        type="submit"
        disabled={loading || disabled}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

FormSubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  context: PropTypes.shape({
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
};

FormSubmitButton.defaultProps = {
  variant: 'text',
};

const useFormRowStyles = makeStyles((theme) => ({
  row: {
    paddingBottom: theme.spacing(1),
  },
  col: {
    paddingBottom: theme.spacing(2),
  },
}));

const FormRow = (props) => {
  const { children } = props;
  const classes = useFormRowStyles();

  return (
    <Row className={classes.row} justify="end">
      {children}
    </Row>
  );
};

FormRow.propTypes = {
  children: PropTypes.node.isRequired,
};

const FormCol = (props) => {
  const { children, width } = props;
  const classes = useFormRowStyles();

  return (
    <Col md={12} lg={width} className={classes.col}>
      {children}
    </Col>
  );
};

FormCol.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
};

export {
  AddressForm,
  CreateFormContext,
  FormTextField,
  FormSubmitButton,
  FormRow,
  FormCol,
};
