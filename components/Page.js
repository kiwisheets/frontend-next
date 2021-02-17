import Router from 'next/router';
import { Container, Fade } from '@material-ui/core';

import AppNavigation from '@/components/AppNavigation';
import Login from '@/components/Login';

import { useIsLoggedInQuery } from '@/graphql/graphql';

export default function Page({ noAuth, children }) {
  const { loading, data, error } = useIsLoggedInQuery();

  if (loading) {
    return null;
  }

  if (noAuth || (!loading && !error && data.isLoggedIn)) {
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

  return <Login />;
}
