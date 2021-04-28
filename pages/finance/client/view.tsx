import React from 'react';
import { Fade } from '@material-ui/core';

import ClientComponent from '@/components/Client';
import router from 'next/router';

const Client = () => {
  const { id } = router.query;

  if (id == null || typeof id !== 'string') {
    return null;
  }

  return (
    <Fade in>
      <ClientComponent edit id={id} />
    </Fade>
  );
};

export default Client;
