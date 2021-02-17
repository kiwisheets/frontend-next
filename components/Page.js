import Router from 'next/router';
import { Container, Fade } from '@material-ui/core';

import AppNavigation from '@/components/AppNavigation';
import Login from '@/components/Login';

import { useIsLoggedInQuery } from '@/graphql/graphql';

export default function Page({ noAuth, children }) {
  const { loading, data, error } = useIsLoggedInQuery();

  if (loading) {
    return <p>Loading page...</p>;
  }

  if (!noAuth && (error || !data.isLoggedIn)) {
    // verify auth
    // Router.push('/login');
    // return <p>Loading page...</p>;
    return <Login />;
  }

  return (
    <Fade in>
      <>
        <AppNavigation onLogout={() => Router.push('/login')}>
          <Container maxWidth="xl" disableGutters>
            {children}
          </Container>
        </AppNavigation>
      </>
    </Fade>
  );
}
