import React from 'react';
import { useRouter } from 'next/router';
import { Fade } from '@material-ui/core';

import Page from '@/components/Page';

import ClientComponent from '@/components/Client';

function Client() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Fade in>
      <ClientComponent edit id={id} />
    </Fade>
  );
}

export default function ClientPage() {
  return (
    <Page>
      <Client />
    </Page>
  );
}
