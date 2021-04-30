import React from 'react';
import { Fade } from '@material-ui/core';

import ClientComponent from '@/components/Client';
import { useRouter } from 'next/router';

const Client = () => {
  const router = useRouter();
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
