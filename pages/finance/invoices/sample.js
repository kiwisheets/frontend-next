import React from 'react';

import { Fade, Paper } from '@material-ui/core';

import FullPanelSpinner from '@/components/FullPanelSpinner';
import { usePreviewInvoiceQuery } from '@/lib/graphql';

const Invoices = () => {
  const { data, loading, error } = usePreviewInvoiceQuery({
    fetchPolicy: 'no-cache',
    variables: {
      previewInvoiceInvoice: {
        clientID: '5xvqrzqOJ6',
        items: [
          {
            description: 'Test',
            name: 'Test item',
            quantity: 1,
            unitCost: 5.0,
          },
        ],
      },
    },
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
