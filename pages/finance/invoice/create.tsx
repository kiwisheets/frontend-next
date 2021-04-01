import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import {
  InvoiceInput,
  LineItemInput,
  usePreviewInvoiceQuery,
} from '@/lib/graphql';

const CreateInvoice: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState,
    getValues,
  } = useForm<InvoiceInput>({
    defaultValues: {},
    mode: 'onBlur',
    resolver: null, // TODO: Use yup for validation
  });

  const { fields, append, remove } = useFieldArray<LineItemInput>({
    control,
    name: 'items',
  });

  const addItem = () => {
    append(
      {
        description: '',
        name: '',
        quantity: 1,
        taxRate: 0,
        unitCost: 0,
      },
      true,
    );
  };

  const { loading, data, error } = usePreviewInvoiceQuery({
    variables: {
      previewInvoiceInvoice: getValues(),
    },
    skip: !formState.isValid,
  });

  const onSubmit = (submitData: InvoiceInput) => {
    console.log('submit: ', submitData);
    // previewInvoice({
    //   variables: {
    //     previewInvoiceInvoice: submitData,
    //   },
    // });
  };

  const isInitialRender = React.useRef(true);

  useEffect(() => {
    if (!fields.length && !isInitialRender.current) {
      console.log('trigger');
      trigger('items');
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, [fields, register, trigger]);

  useEffect(() => {
    if (formState.isValid && !isInitialRender.current) {
      console.log('valid');
    }
  }, [formState]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="number">
            Number
            <input
              name="number"
              type="number"
              placeholder="Number"
              ref={register({
                valueAsNumber: true,
                required: true,
                min: 1,
              })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="number">
            Client ID
            <input
              name="clientID"
              type="string"
              placeholder="Client ID"
              ref={register({
                required: true,
                minLength: 4,
              })}
            />
          </label>
        </div>
        <div>
          {fields.map((item, itemIndex) => (
            <div key={item.id}>
              <label htmlFor={`items[${itemIndex}].name`}>
                Name
                <input
                  name={`items[${itemIndex}].name`}
                  defaultValue=""
                  ref={register()}
                />
              </label>
              <label htmlFor={`items[${itemIndex}].description`}>
                Description
                <input
                  name={`items[${itemIndex}].description`}
                  defaultValue=""
                  ref={register()}
                />
              </label>
              <label htmlFor={`items[${itemIndex}].quantity`}>
                Quantity
                <input
                  name={`items[${itemIndex}].quantity`}
                  type="number"
                  step=".01"
                  defaultValue={0}
                  ref={register({ valueAsNumber: true })}
                />
              </label>
              <label htmlFor={`items[${itemIndex}].unitCost`}>
                Unit Cost
                <input
                  name={`items[${itemIndex}].unitCost`}
                  type="number"
                  step=".01"
                  defaultValue={0}
                  ref={register({ valueAsNumber: true })}
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  remove(itemIndex);
                  trigger();
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addItem}>
          Add item
        </button>

        <input type="submit" />
      </form>
      <div>
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
    </div>
  );
};

export default CreateInvoice;
