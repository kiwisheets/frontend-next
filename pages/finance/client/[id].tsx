import React from 'react';
import { Fade } from '@material-ui/core';

import ClientComponent from '@/components/Client';
import { GetStaticProps } from 'next';

type ClientProps = {
  id: string;
};

const Client = (props: ClientProps) => {
  const { id } = props;

  if (id == null) {
    return null;
  }

  return (
    <Fade in>
      <ClientComponent edit id={id} />
    </Fade>
  );
};

export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    id: context.params.id,
  },
});

export default Client;
