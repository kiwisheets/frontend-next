import React, { useState, useEffect } from 'react';
import { FieldArray, Formik, useFormikContext } from 'formik';
import { Button, PageHeader, Space } from 'antd';
import { Form, Input } from 'formik-antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import Router from 'next/router';

import {
  LineItemInput,
  InvoiceInput,
  usePreviewInvoiceQuery,
  useCreateInvoiceMutation,
} from '@/lib/graphql';
import { useDebounce } from 'react-use';

const InvoiceItemSchema: Yup.SchemaOf<LineItemInput> = Yup.object({
  description: Yup.string().required(),
  name: Yup.string().required(),
  quantity: Yup.number().required().positive(),
  taxRate: Yup.number().optional().positive(),
  unitCost: Yup.number().required().positive(),
  taxInclusive: Yup.boolean().optional(),
});

const InvoiceSchema: Yup.SchemaOf<InvoiceInput> = Yup.object({
  clientID: Yup.string().required(),
  items: Yup.array().of(InvoiceItemSchema).defined(),
});

const InvoicePreview: React.FC = () => {
  const {
    values,
    isValid,
    isValidating,
    status,
  } = useFormikContext<InvoiceInput>();

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
    fetchPolicy: 'cache-and-network',
  });

  const [invoiceDoc, setInvoiceDoc] = useState('');

  useEffect(() => {
    if (data?.previewInvoice) {
      setInvoiceDoc(data.previewInvoice);
    }
  }, [setInvoiceDoc, data]);

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
      {invoiceDoc && (
        <iframe
          title="Invoice Preview"
          srcDoc={invoiceDoc}
          width="100%"
          height="1000px"
        />
      )}
    </div>
  );
};

const CreateInvoice: React.FC = () => {
  const [createInvoice, { loading }] = useCreateInvoiceMutation({
    onCompleted: ({ createInvoice: { id } }) => {
      Router.push(id);
    },
  });

  return (
    <PageHeader
      ghost={false}
      onBack={() => Router.back()}
      title="Create Invoice"
      subTitle="Design your invoice"
      style={{
        border: '1px solid rgb(217, 217, 217)',
        borderRadius: '2px',
        // boxShadow: '0 0 0 1px rgb(224, 224, 224)',
      }}
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    >
      <Formik
        initialValues={{
          clientID: '5xvqrzqOJ6',
          items: [
            {
              name: 'Test Item',
              description: 'Test',
              quantity: 1,
              unitCost: 1.5,
            },
          ],
        }}
        isInitialValid
        validationSchema={InvoiceSchema}
        onSubmit={(values: InvoiceInput) => {
          createInvoice({
            variables: {
              createInvoice: values,
            },
          });
        }}
      >
        {({ isValid, isValidating, dirty, touched, values }) => (
          <Form>
            <FieldArray name="items">
              {(arrayHelpers) => (
                <>
                  {values.items.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Space key={`items.${index}`} align="baseline">
                      <Form.Item name={`items.${index}.name`} label="Item Name">
                        <Input type="text" name={`items.${index}.name`} />
                      </Form.Item>
                      <Form.Item
                        name={`items.${index}.description`}
                        label="Item Description"
                      >
                        <Input
                          type="text"
                          name={`items.${index}.description`}
                        />
                      </Form.Item>
                      <Form.Item
                        name={`items.${index}.unitCost`}
                        label="Item Cost"
                      >
                        <Input
                          type="number"
                          step={0.01}
                          name={`items.${index}.unitCost`}
                        />
                      </Form.Item>
                      <Form.Item
                        name={`items.${index}.quantity`}
                        label="Quantity"
                      >
                        <Input type="number" name={`items.${index}.quantity`} />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => arrayHelpers.remove(index)}
                      />
                    </Space>
                  ))}
                </>
              )}
            </FieldArray>
            <Form.Item name="submit">
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
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
    </PageHeader>
  );
};

export default CreateInvoice;
