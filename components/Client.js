import React, { useEffect, useState } from 'react';
import { string, func, bool, shape } from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Fade,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Skeleton } from '@material-ui/lab';

import { useClientQuery, useUpdateClientMutation } from '@/lib/graphql';
import { Row, Col } from './Grid';
import { CreateFormContext, FormTextField } from './Form';

const FormContext = CreateFormContext();

const EditForm = (props) => {
  const { initialData, onChange, loading } = props;

  const [client, setClient] = useState({
    website: initialData.client.website,
    vatNumber: initialData.client.vatNumber,
    businessNumber: initialData.client.businessNumber,
    phone: initialData.client.phone,
  });

  const handleChange = (changed) => {
    setClient((prevClient) => ({
      ...prevClient,
      ...changed,
    }));
  };

  const handleChangeWebsite = (value) => {
    handleChange({
      website: value,
    });
  };

  const handleChangeVatNumber = (value) => {
    handleChange({
      vatNumber: value,
    });
  };

  const handleChangeBusinessNumber = (value) => {
    handleChange({
      businessNumber: value,
    });
  };

  const handleChangePhone = (value) => {
    handleChange({
      phone: value,
    });
  };

  useEffect(() => {
    onChange(client);
  }, [client, onChange]);

  return (
    <FormContext.Provider value={{ loading, disabled: false }}>
      <Fade in>
        <div>
          <Row>
            <Col md={6}>
              <FormTextField
                context={FormContext}
                label="Website"
                value={client.website}
                onChange={handleChangeWebsite}
              />
            </Col>
            <Col md={6}>
              <FormTextField
                context={FormContext}
                label="VAT(GST) Number"
                value={client.vatNumber}
                onChange={handleChangeVatNumber}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormTextField
                context={FormContext}
                label="Business Number"
                value={client.businessNumber}
                onChange={handleChangeBusinessNumber}
              />
            </Col>
            <Col md={6}>
              <FormTextField
                context={FormContext}
                label="Phone Number"
                value={client.phone}
                onChange={handleChangePhone}
              />
            </Col>
          </Row>
        </div>
      </Fade>
    </FormContext.Provider>
  );
};

EditForm.propTypes = {
  initialData: shape({
    client: shape({
      website: string,
      vatNumber: string,
      businessNumber: string,
      phone: string,
    }).isRequired,
  }).isRequired,
  onChange: func.isRequired,
  loading: bool.isRequired,
};

const useStyles = makeStyles((theme) => ({
  textAction: {
    margin: theme.spacing(1),
  },
  buttonWrapper: {
    // margin: theme.spacing(1),
    position: 'relative',
    display: 'inline',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Client = (props) => {
  const { id, edit, onEdit } = props;
  const classes = useStyles();

  const [modifying, setModifying] = useState(false);
  const [client, setClient] = useState({});

  const { data, loading, error, refetch } = useClientQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [
    updateClientMutation,
    { loading: updateLoading, data: updateData },
  ] = useUpdateClientMutation();

  useEffect(() => {
    if (updateData != null) {
      refetch();
      setModifying(false);
    }
  }, [updateData, refetch]);

  const title = () => {
    if (loading) {
      return <Skeleton />;
    }
    if (error) {
      return 'Failed to load';
    }
    return data.client.name;
  };

  const subHeader = () => (modifying ? 'Edit Client' : 'Client');

  const internalEdit = () => {
    setModifying(true);
  };

  const cancelEdit = () => {
    setModifying(false);
  };

  const updateClient = () => {
    updateClientMutation({
      variables: {
        id,
        client,
      },
    });
  };

  const actions = () => {
    if (modifying) {
      return (
        <>
          <Button
            className={classes.textAction}
            variant="text"
            onClick={cancelEdit}
          >
            Discard
          </Button>
          <div className={classes.buttonWrapper}>
            <Button
              className={classes.textAction}
              variant="contained"
              color="primary"
              onClick={updateClient}
              disabled={updateLoading}
            >
              Save
            </Button>
            {updateLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </>
      );
    }

    return (
      <>
        {edit && (
          <IconButton onClick={onEdit || internalEdit} disabled={loading}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton>
          <MoreIcon />
        </IconButton>
      </>
    );
  };

  const Display = () => (
    <Fade in>
      <div>
        <Row>
          <Col md={6}>
            <Typography variant="subtitle2">Website:</Typography>
            <Typography>
              {loading ? <Skeleton /> : data.client.website}
            </Typography>
          </Col>
          <Col md={6}>
            <Typography variant="subtitle2">VAT(GST) Number:</Typography>
            <Typography>
              {loading ? <Skeleton /> : data.client.vatNumber}
            </Typography>
          </Col>
          <Col md={6}>
            <Typography variant="subtitle2">Business Number:</Typography>
            <Typography>
              {loading ? <Skeleton /> : data.client.businessNumber}
            </Typography>
          </Col>
          <Col md={6}>
            <Typography variant="subtitle2">Phone Number:</Typography>
            <Typography>
              {loading ? <Skeleton /> : data.client.phone}
            </Typography>
          </Col>
        </Row>
      </div>
    </Fade>
  );

  const ClientForm = () => {
    if (error) {
      return <Col xs={12}>error</Col>;
    }
    if (modifying) {
      return (
        <EditForm
          initialData={data}
          onChange={setClient}
          loading={updateLoading}
        />
      );
    }
    return Display({ data, loading });
    // <Display data={data} loading={loading} />
  };

  return (
    <Fade in>
      <Card>
        <CardHeader
          title={title()}
          subheader={subHeader()}
          action={actions()}
        />
        <Divider />
        <CardContent>{ClientForm()}</CardContent>
      </Card>
    </Fade>
  );
};

Client.propTypes = {
  id: string.isRequired,
  edit: bool,
  onEdit: func,
};

Client.defaultProps = {
  edit: false,
  onEdit: undefined,
};

export default Client;
