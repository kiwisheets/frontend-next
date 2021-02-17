import Router from 'next/router';
import { Container, Fade } from '@material-ui/core';

import AppNavigation from '@/components/AppNavigation';
import Login from '@/components/Login';

import { useIsLoggedInQuery } from '@/graphql/graphql';
import FullPageSpinner from './FullPageSpinner';

export default function Page({ noAuth, children }) {
  const { loading, data, error } = useIsLoggedInQuery();

  if (loading) {
    return (
      <div key="spinner">
        <FullPageSpinner />
      </div>
    );
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
