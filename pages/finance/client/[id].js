import React from 'react';
import { useRouter } from 'next/router';
import { Fade } from '@material-ui/core';

import ClientComponent from '@/components/Client';

export default function Client() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Fade in>
      <ClientComponent edit id={id} />
    </Fade>
  );
}
