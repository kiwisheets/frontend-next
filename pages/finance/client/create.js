import React, { useState } from 'react';
import {
  Fade,
  makeStyles,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Button,
  CardActions,
  FormControlLabel,
  Switch,
  Collapse,
} from '@material-ui/core';

import { useCreateClientMutation } from '@/graphql/graphql';

import {
  CreateFormContext,
  FormTextField,
  FormRow,
  FormCol,
  AddressForm,
  FormSubmitButton,
} from '@/components/Form';

import Router from 'next/router';

const FormContext = CreateFormContext();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  actionButtonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

export default function CreateClient() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true);
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});

  const [expandBillingAddress, setExpandBillingAddress] = useState(true);

  const [mutate, { loading, error, data }] = useCreateClientMutation();

  if (error) {
    console.log(error.message);
    console.log(error);
  }

  if (data) {
    if (data.createClient && data.createClient.id) {
      Router.push(`../client/${data.createClient.id}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      variables: {
        client: {
          name,
          vatNumber,
          businessNumber,
          phone,
          website,
          billingAddress,
          shippingAddress: shippingSameAsBilling
            ? billingAddress
            : shippingAddress,
        },
      },
    });
  };

  return (
    <Fade in>
      <Card>
        <CardHeader title="Create Client" subheader="Client/Business Details" />
        <Divider />
        <FormContext.Provider value={{ loading, disabled: false }}>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <FormRow>
                <FormCol width={12}>
                  <FormTextField
                    context={FormContext}
                    label="Client Name"
                    onChange={setName}
                    required
                    value={name}
                  />
                </FormCol>
                <FormCol width={6}>
                  <FormTextField
                    context={FormContext}
                    label="VAT(GST) Number"
                    onChange={setVatNumber}
                    value={vatNumber}
                  />
                </FormCol>
                <FormCol width={6}>
                  <FormTextField
                    context={FormContext}
                    label="Business Number"
                    onChange={setBusinessNumber}
                    value={businessNumber}
                  />
                </FormCol>
                <FormCol width={6}>
                  <FormTextField
                    context={FormContext}
                    label="Phone Number"
                    onChange={setPhoneNumber}
                    value={phone}
                  />
                </FormCol>
                <FormCol width={6}>
                  <FormTextField
                    context={FormContext}
                    label="Website"
                    onChange={setWebsite}
                    value={website}
                  />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol width={expandBillingAddress ? 12 : 6}>
                  <FormRow>
                    <FormCol width={12}>
                      <Typography variant="subtitle1">
                        Billing Address
                      </Typography>
                    </FormCol>
                  </FormRow>
                  <AddressForm
                    context={FormContext}
                    onChange={setBillingAddress}
                  />
                </FormCol>
                {true && (
                  <FormCol width={6}>
                    <Collapse
                      in={!shippingSameAsBilling}
                      unmountOnExit
                      onExited={() => setExpandBillingAddress(true)}
                      onEnter={() => setExpandBillingAddress(false)}
                    >
                      <FormRow>
                        <FormCol width={12}>
                          <Typography variant="subtitle1">
                            Shipping Address
                          </Typography>
                        </FormCol>
                      </FormRow>
                      <AddressForm
                        context={FormContext}
                        onChange={setShippingAddress}
                      />
                    </Collapse>
                  </FormCol>
                )}
              </FormRow>
              <FormRow>
                <FormCol width={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={shippingSameAsBilling}
                        onChange={(e) =>
                          setShippingSameAsBilling(e.target.checked)
                        }
                        name="shippingSameAsBilling"
                        color="primary"
                      />
                    }
                    label="Shipping Address Same as Billing"
                  />
                </FormCol>
              </FormRow>
            </CardContent>
            <Divider />
            <CardActions>
              <div className={classes.actionButtonWrapper}>
                <Button
                  size="medium"
                  color="primary"
                  onClick={() => Router.back()}
                >
                  Back
                </Button>
              </div>
              <FormSubmitButton context={FormContext}>Create</FormSubmitButton>
            </CardActions>
          </form>
        </FormContext.Provider>
      </Card>
    </Fade>
  );
}

CreateClient.propTypes = {};
