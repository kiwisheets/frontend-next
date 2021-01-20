import React from 'react';

import { Fade, Paper } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import PREVIEW_INVOICE from '@/graphql/queries/previewInvoice';
import FullPanelSpinner from '@/components/FullPanelSpinner';

const Invoices = () => {
  const { data, loading, error } = useQuery(PREVIEW_INVOICE, {
    fetchPolicy: 'no-cache',
  });

  return (
    <Fade in>
      <Paper>
        {loading && <FullPanelSpinner />}
        {data && (
          <iframe
            title="invoicepreview"
            srcDoc={data.previewInvoice}
            width="100%"
            height="1000px"
          />
        )}
        {error && (
          <p
            style={{
              color: 'red',
            }}
          >
            Error: {error.message}
          </p>
        )}
      </Paper>
    </Fade>
  );
};

export default Invoices;
