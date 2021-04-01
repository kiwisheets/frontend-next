import React, { useState } from 'react';
import { Formik, FormikHelpers, useFormikContext } from 'formik';
import { Form, Input } from 'formik-antd';
import * as Yup from 'yup';

import {
  LineItemInput,
  PreviewInvoiceInput,
  usePreviewInvoiceQuery,
} from '@/lib/graphql';
import { useDebounce } from 'react-use';

const InvoiceItemSchema: Yup.SchemaOf<LineItemInput> = Yup.object({
  description: Yup.string().required(),
  name: Yup.string().required(),
  quantity: Yup.number().required().positive(),
  taxRate: Yup.number().optional().positive(),
  unitCost: Yup.number().required().positive(),
});

const InvoiceSchema: Yup.SchemaOf<PreviewInvoiceInput> = Yup.object({
  clientID: Yup.string().required(),
  number: Yup.number().required().positive(),
  items: Yup.array().of(InvoiceItemSchema).defined(),
});

const InvoicePreview = () => {
  const {
    values,
    isValid,
    isValidating,
    status,
  } = useFormikContext<PreviewInvoiceInput>();

  const [queryValues, setQueryValues] = useState(values);

  useDebounce(
    () => {
      if (isValid && !isValidating) {
        setQueryValues(values);
      }
    },
    500,
    [values, isValid, isValidating],
  );

  const { data, loading, error } = usePreviewInvoiceQuery({
    variables: {
      previewInvoiceInvoice: queryValues,
    },
    errorPolicy: 'none',
  });

  return (
    <div>
      <p>{JSON.stringify(queryValues, null, 2)}</p>
      <p>{status}</p>
      {loading && <p>Loading...</p>}
      {error && (
        <p
          style={{
            color: 'red',
          }}
        >
          {error.message}
        </p>
      )}
      {data && (
        <iframe
          title="Invoice Preview"
          srcDoc={data.previewInvoice}
          width="100%"
          height="1000px"
        />
      )}
    </div>
  );
};

const CreateInvoice = () => (
  <Formik
    initialValues={{
      number: 1,
      clientID: '5xvqrzqOJ6',
      items: [],
    }}
    isInitialValid
    validationSchema={InvoiceSchema}
    onSubmit={(
      values: PreviewInvoiceInput,
      { setSubmitting }: FormikHelpers<PreviewInvoiceInput>,
    ) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      });
    }}
  >
    {({ isValid, isValidating, dirty, touched }) => (
      <Form>
        <Form.Item name="number" label="Invoice Number">
          <Input type="number" name="number" />
        </Form.Item>
        <div>
          <p>
            isValid: {String(isValid)}
            <br />
            isValidating: {String(isValidating)}
            <br />
            dirty: {String(dirty)}
            <br />
            touched: {JSON.stringify(touched)}
          </p>
        </div>
        <InvoicePreview />
      </Form>
    )}
  </Formik>
);

export default CreateInvoice;
